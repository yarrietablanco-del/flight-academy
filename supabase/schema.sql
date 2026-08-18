-- Flight Academy: progreso sincronizado por usuario.
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  statuses jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Los usuarios leen su propio progreso"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Los usuarios crean su propio progreso"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios actualizan su propio progreso"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
