-- ============================================================================
-- Fixes for the Warren study.service.ts bugs.
-- Run this in the Supabase SQL editor (or as a migration) before deploying
-- the patched TypeScript files.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. spend_credits: atomic check-and-deduct, replaces the old spendCredits()
--    logic that called the wrong RPC (decrement_vote) and never actually
--    deducted anything, letting anyone unlock premium materials for free.
--
--    The UPDATE's WHERE clause does the balance check and the deduction in
--    one atomic statement, so two concurrent calls can't both succeed off
--    the same starting balance. GET DIAGNOSTICS tells us whether the row
--    actually matched (i.e. had enough credits) — if not, we bail out
--    before touching unlocked_materials at all.
-- ----------------------------------------------------------------------------
create or replace function public.spend_credits(p_user_id uuid, p_material_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cost int;
  v_updated int;
begin
  select premium_cost into v_cost
  from public.study_materials
  where id = p_material_id;

  if v_cost is null then
    return false;
  end if;

  update public.profiles
  set credits = credits - v_cost
  where id = p_user_id and credits >= v_cost;

  get diagnostics v_updated = row_count;

  if v_updated = 0 then
    return false;
  end if;

  insert into public.unlocked_materials (user_id, material_id)
  values (p_user_id, p_material_id)
  on conflict do nothing;

  return true;
end;
$$;

-- ----------------------------------------------------------------------------
-- 2. award_credits: atomic increment, replaces the old awardCredits() logic
--    that did a client-side read-then-write (select credits, then update
--    credits = old + amount), which is a race condition under concurrent
--    calls — not exploitable the same way as spend_credits, but can still
--    silently drop awarded credits.
-- ----------------------------------------------------------------------------
create or replace function public.award_credits(p_user_id uuid, p_amount int)
returns void
language sql
security definer
set search_path = public
as $$
  update public.profiles
  set credits = credits + p_amount
  where id = p_user_id and p_amount > 0;
$$;

-- ----------------------------------------------------------------------------
-- 3. increment: adds an `amount` parameter (default 1, so the existing
--    incrementDownloadCount() call site needs no changes) so awardKarma()
--    can do a single atomic call instead of looping N sequential RPC calls.
--
--    Also adds an allowlist of (table, column) pairs it's permitted to
--    touch. Without this, a generic "update any column on any table by an
--    arbitrary amount" RPC callable from client-side JS is a foothold for
--    abuse regardless of how it's used elsewhere in the app.
-- ----------------------------------------------------------------------------
create or replace function public.increment(
  table_name text,
  column_name text,
  row_id uuid,
  amount int default 1
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if (table_name, column_name) not in (
    ('study_materials', 'download_count'),
    ('profiles', 'karma')
  ) then
    raise exception 'increment() is not permitted on %.%', table_name, column_name;
  end if;

  execute format(
    'update public.%I set %I = %I + $1 where id = $2',
    table_name, column_name, column_name
  ) using amount, row_id;
end;
$$;
