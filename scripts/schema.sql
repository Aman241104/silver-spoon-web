-- Silver Spoon products table
create table if not exists products (
  id             text primary key,
  name           text not null,
  category       text not null,
  sub_category   text,
  serial_number  text,
  purity         text,
  gender         text check (gender in ('men', 'women', 'kids', 'unisex')),
  description    text not null default '',
  image          text not null default '',
  price          numeric not null default 0,
  weight         text,
  dimensions     text,
  featured       boolean not null default false,
  trending       boolean not null default false,
  is_weekly      boolean not null default false,
  occasions      text[] not null default '{}',
  styles         text[] not null default '{}'
);

-- Row-level security
alter table products enable row level security;

-- Public read
create policy "public read"
  on products for select
  using (true);

-- Authenticated write
create policy "authenticated insert"
  on products for insert
  to authenticated
  with check (true);

create policy "authenticated update"
  on products for update
  to authenticated
  using (true);

create policy "authenticated delete"
  on products for delete
  to authenticated
  using (true);
