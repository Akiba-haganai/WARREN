-- Migration: cram_planner_v1
begin;

-- cram_plan_items: add id if missing (table is empty, safe)
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='cram_plan_items' and column_name='id'
  ) then
    alter table public.cram_plan_items
      add column id uuid primary key default gen_random_uuid();
  end if;
end $$;

alter table public.cram_plan_items
  add column if not exists position int default 0;

-- cram_plans: share + tracking fields
alter table public.cram_plans
  add column if not exists share_slug text unique,
  add column if not exists share_enabled boolean default false,
  add column if not exists course_key text,
  add column if not exists days_total int,
  add column if not exists status text default 'active'
    check (status in ('active','completed','archived'));

create index if not exists idx_cram_plans_user
  on public.cram_plans (user_id, created_at desc);

create index if not exists idx_cram_plans_slug
  on public.cram_plans (share_slug)
  where share_slug is not null;

-- Per-user progress (separate from plan so shared plans don't leak state)
create table if not exists public.cram_plan_progress (
  item_id uuid not null references public.cram_plan_items(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (item_id, user_id)
);

alter table public.cram_plan_progress enable row level security;

drop policy if exists "users view own progress" on public.cram_plan_progress;
create policy "users view own progress"
  on public.cram_plan_progress for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "users insert own progress" on public.cram_plan_progress;
create policy "users insert own progress"
  on public.cram_plan_progress for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "users delete own progress" on public.cram_plan_progress;
create policy "users delete own progress"
  on public.cram_plan_progress for delete
  to authenticated
  using (user_id = auth.uid());

commit;
