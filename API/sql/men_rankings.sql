create table
  men_rankings (
    id bigint primary key generated always as identity,
    user_id uuid references users (id) unique,
    rank integer not null,
    points integer not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );