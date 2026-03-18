create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null,
  referral_code text not null unique,
  referred_by_code text,
  successful_referrals integer not null default 0,
  points integer not null default 0,
  is_admin boolean not null default false,
  created_at timestamp with time zone not null default timezone('utc', now())
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  collection text not null,
  description text not null,
  image_url text not null,
  price numeric(10,2) not null,
  stock integer not null default 0,
  created_at timestamp with time zone not null default timezone('utc', now())
);

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  discount_percent integer not null default 0,
  bonus_referral_points integer not null default 0,
  applies_to_product_ids text[] default '{}',
  is_active boolean not null default true,
  created_at timestamp with time zone not null default timezone('utc', now())
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  subtotal numeric(10,2) not null,
  discount_amount numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  items_count integer not null,
  status text not null default 'pending',
  referral_points_awarded integer not null default 0,
  created_at timestamp with time zone not null default timezone('utc', now())
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id text not null references public.products (id),
  quantity integer not null default 1,
  unit_price numeric(10,2) not null,
  final_price numeric(10,2) not null
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.promotions enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

create policy "products_public_read"
on public.products for select
using (true);

create policy "promotions_public_read"
on public.promotions for select
using (true);

create policy "promotions_admin_write"
on public.promotions for insert
with check (
  exists (
    select 1 from public.profiles
    where public.profiles.id = auth.uid()
      and public.profiles.is_admin = true
  )
);

create policy "orders_select_own"
on public.orders for select
using (auth.uid() = user_id);

create policy "orders_insert_own"
on public.orders for insert
with check (auth.uid() = user_id);

create policy "order_items_select_own"
on public.order_items for select
using (
  exists (
    select 1
    from public.orders
    where public.orders.id = public.order_items.order_id
      and public.orders.user_id = auth.uid()
  )
);

create policy "order_items_insert_own"
on public.order_items for insert
with check (
  exists (
    select 1
    from public.orders
    where public.orders.id = public.order_items.order_id
      and public.orders.user_id = auth.uid()
  )
);

create or replace function public.handle_paid_order_rewards()
returns trigger
language plpgsql
security definer
as $$
declare
  active_bonus integer := 0;
  referred_profile_id uuid;
begin
  if new.status = 'paid' and old.status is distinct from 'paid' then
    select coalesce(max(bonus_referral_points), 0)
      into active_bonus
    from public.promotions
    where is_active = true;

    update public.profiles
    set points = points + greatest(20 + active_bonus, 20)
    where id = new.user_id;

    select p2.id into referred_profile_id
    from public.profiles p1
    join public.profiles p2 on p2.referral_code = p1.referred_by_code
    where p1.id = new.user_id;

    if referred_profile_id is not null then
      update public.profiles
      set successful_referrals = successful_referrals + 1,
          points = points + greatest(40 + active_bonus, 40)
      where id = referred_profile_id;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_orders_rewards on public.orders;
create trigger trg_orders_rewards
after update on public.orders
for each row execute procedure public.handle_paid_order_rewards();

insert into public.products (id, name, collection, description, image_url, price, stock)
values
  ('amber-noir', 'Amber Noir', 'Night Veil', 'Warm amber, vanilla resin, and smoked cedar.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80', 88, 18),
  ('citrine-veil', 'Citrine Veil', 'Sun Ritual', 'Bergamot, neroli, and luminous white musk.', 'https://images.unsplash.com/photo-1615634262417-8f9d0d18cbfd?auto=format&fit=crop&w=1000&q=80', 74, 21),
  ('rose-atlas', 'Rose Atlas', 'Velvet Bloom', 'Rose absolute, pink pepper, and suede.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80', 96, 12),
  ('oud-river', 'Oud River', 'Imperial Wood', 'Oud accord, cardamom, and dark patchouli.', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80', 120, 8)
on conflict (id) do nothing;
