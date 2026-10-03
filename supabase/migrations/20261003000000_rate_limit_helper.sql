-- Migration: rate_limit_helper
create or replace function public.check_rate_limit(
  p_user_id uuid,
  p_action text,
  p_max int,
  p_window_hours int default 24
)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  select count(*) into v_count
  from public.rate_limits
  where user_id = p_user_id
    and action_type = p_action
    and created_at > now() - (p_window_hours || ' hours')::interval;
  return v_count < p_max;
end;
$$;

grant execute on function public.check_rate_limit(uuid, text, int, int) to authenticated, service_role;
