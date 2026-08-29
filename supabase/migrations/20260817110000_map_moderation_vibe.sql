-- ============================================================================
-- Campus Map: moderation groundwork + self-reported vibe/occupancy.
-- Run after the bounties/solutions migration.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. map_pins: moderation + verification + live operational status
-- ----------------------------------------------------------------------------
alter table public.map_pins
  add column if not exists review_status text not null default 'published'
    check (review_status in ('pending', 'published', 'rejected')),
  add column if not exists is_verified boolean not null default false,
  add column if not exists operational_status text not null default 'open'
    check (operational_status in ('open', 'closed_temporarily', 'quiet_zone', 'event_active')),
  add column if not exists operational_note text;

create index if not exists idx_map_pins_review_status on public.map_pins (review_status);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'moderator')
  );
$$;

drop policy if exists "map pins visible per role" on public.map_pins;
drop policy if exists "students suggest, staff publish directly" on public.map_pins;
drop policy if exists "staff manage all pins" on public.map_pins;
drop policy if exists "staff delete pins" on public.map_pins;

create policy "map pins visible per role"
  on public.map_pins for select
  to authenticated
  using (
    review_status = 'published'
    or created_by = auth.uid()
    or public.is_staff()
  );

create policy "students suggest, staff publish directly"
  on public.map_pins for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and (
      public.is_staff()
      or (review_status = 'pending' and is_verified = false)
    )
  );

create policy "staff manage all pins"
  on public.map_pins for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "staff delete pins"
  on public.map_pins for delete
  to authenticated
  using (public.is_staff());

-- ----------------------------------------------------------------------------
-- 2. Approve / reject as RPCs
-- ----------------------------------------------------------------------------
create or replace function public.approve_pin(p_pin_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_creator uuid;
  v_updated int;
begin
  if not public.is_staff() then
    raise exception 'Not authorized';
  end if;

  select created_by into v_creator
  from public.map_pins
  where id = p_pin_id and review_status = 'pending';

  if v_creator is null then
    return false;
  end if;

  update public.map_pins
  set review_status = 'published'
  where id = p_pin_id and review_status = 'pending';

  get diagnostics v_updated = row_count;
  if v_updated = 0 then
    return false;
  end if;

  update public.profiles set karma = karma + 5 where id = v_creator;
  return true;
end;
$$;

create or replace function public.reject_pin(p_pin_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_updated int;
begin
  if not public.is_staff() then
    raise exception 'Not authorized';
  end if;

  update public.map_pins
  set review_status = 'rejected'
  where id = p_pin_id and review_status = 'pending';

  get diagnostics v_updated = row_count;
  return v_updated > 0;
end;
$$;

grant execute on function public.approve_pin(uuid) to authenticated;
grant execute on function public.reject_pin(uuid) to authenticated;

-- ----------------------------------------------------------------------------
-- 3. Vibe / occupancy self-reports
-- ----------------------------------------------------------------------------
create table if not exists public.pin_vibe_reports (
  pin_id uuid not null references public.map_pins(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  noise_level text not null check (noise_level in ('quiet', 'chatty', 'loud')),
  crowd_level text not null check (crowd_level in ('empty', 'moderate', 'packed')),
  reported_at timestamptz not null default now(),
  primary key (pin_id, user_id)
);

create index if not exists idx_pin_vibe_reports_recent on public.pin_vibe_reports (pin_id, reported_at desc);

alter table public.pin_vibe_reports enable row level security;

do $$ begin
  create policy "vibe reports viewable by authenticated users"
    on public.pin_vibe_reports for select
    to authenticated
    using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users report their own vibe"
    on public.pin_vibe_reports for insert
    to authenticated
    with check (user_id = auth.uid());
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users update their own vibe report"
    on public.pin_vibe_reports for update
    to authenticated
    using (user_id = auth.uid())
    with check (user_id = auth.uid());
exception when duplicate_object then null; end $$;
