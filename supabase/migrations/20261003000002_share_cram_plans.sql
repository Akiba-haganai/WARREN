-- Migration: public_read_shared_cram_plans
create policy "public read shared cram plans"
  on public.cram_plans for select
  to anon, authenticated
  using (share_enabled = true and share_slug is not null);
