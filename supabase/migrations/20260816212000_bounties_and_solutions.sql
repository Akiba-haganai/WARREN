-- ============================================================================
-- Phase 2: Past Paper Bounties + Crowdsourced Solutions
-- Pure Postgres CRUD — no AI, no extra realtime connections, stays well
-- inside the free tier. Run after 20260816205000_study_map_fixes.sql.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------
create table if not exists public.paper_bounties (
  id uuid primary key default gen_random_uuid(),
  course_code text not null,
  academic_year text not null,
  paper_type text not null,
  bounty_karma int not null default 10 check (bounty_karma > 0),
  status text not null default 'open' check (status in ('open', 'fulfilled', 'closed')),
  created_by uuid not null references public.profiles(id) on delete cascade,
  fulfilled_material_id uuid references public.study_materials(id) on delete set null,
  fulfilled_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_paper_bounties_status on public.paper_bounties (status, created_at desc);
create index if not exists idx_paper_bounties_course on public.paper_bounties (course_code);

create table if not exists public.paper_solutions (
  id uuid primary key default gen_random_uuid(),
  material_id uuid not null references public.study_materials(id) on delete cascade,
  question_number text not null,
  solution_text text not null,
  author_id uuid not null references public.profiles(id) on delete cascade,
  upvotes_count int not null default 0,
  is_lecturer_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_paper_solutions_material on public.paper_solutions (material_id, question_number);

-- Tracks who upvoted what, both to prevent double-upvoting and so the app
-- can show "you already upvoted this" state.
create table if not exists public.solution_upvotes (
  solution_id uuid not null references public.paper_solutions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (solution_id, user_id)
);

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------
alter table public.paper_bounties enable row level security;
alter table public.paper_solutions enable row level security;
alter table public.solution_upvotes enable row level security;

do $$ begin
  create policy "bounties are viewable by authenticated users"
    on public.paper_bounties for select
    to authenticated
    using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can create their own bounties"
    on public.paper_bounties for insert
    to authenticated
    with check (created_by = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "creators can close their own open bounties"
    on public.paper_bounties for update
    to authenticated
    using (created_by = auth.uid() and status = 'open')
    with check (status = 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "solutions are viewable by authenticated users"
    on public.paper_solutions for select
    to authenticated
    using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can post their own solutions"
    on public.paper_solutions for insert
    to authenticated
    with check (author_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "authors can edit their own solution text"
    on public.paper_solutions for update
    to authenticated
    using (author_id = auth.uid())
    with check (author_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can view their own upvotes"
    on public.solution_upvotes for select
    to authenticated
    using (user_id = auth.uid());
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- Atomic RPCs
-- ----------------------------------------------------------------------------

create or replace function public.toggle_solution_upvote(p_solution_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_existing boolean;
begin
  if v_user is null then
    raise exception 'Not authenticated';
  end if;

  select exists(
    select 1 from public.solution_upvotes
    where solution_id = p_solution_id and user_id = v_user
  ) into v_existing;

  if v_existing then
    delete from public.solution_upvotes
    where solution_id = p_solution_id and user_id = v_user;

    update public.paper_solutions
    set upvotes_count = greatest(upvotes_count - 1, 0)
    where id = p_solution_id;

    return false;
  else
    insert into public.solution_upvotes (solution_id, user_id)
    values (p_solution_id, v_user);

    update public.paper_solutions
    set upvotes_count = upvotes_count + 1
    where id = p_solution_id;

    return true;
  end if;
end;
$$;

grant execute on function public.toggle_solution_upvote(uuid) to authenticated;

create or replace function public.fulfill_bounty(p_bounty_id uuid, p_material_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_karma int;
  v_updated int;
begin
  if v_user is null then
    raise exception 'Not authenticated';
  end if;

  select bounty_karma into v_karma
  from public.paper_bounties
  where id = p_bounty_id and status = 'open';

  if v_karma is null then
    return false; -- doesn't exist, or already fulfilled/closed
  end if;

  update public.paper_bounties
  set status = 'fulfilled',
      fulfilled_material_id = p_material_id,
      fulfilled_by = v_user
  where id = p_bounty_id and status = 'open';

  get diagnostics v_updated = row_count;

  if v_updated = 0 then
    return false; -- someone else fulfilled it in the same instant
  end if;

  update public.profiles
  set karma = karma + v_karma
  where id = v_user;

  return true;
end;
$$;

grant execute on function public.fulfill_bounty(uuid, uuid) to authenticated;
