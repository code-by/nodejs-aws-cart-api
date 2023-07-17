DO $$ BEGIN
	create type status_enum as ENUM ('OPEN', 'ORDERED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

drop table if exists carts cascade;
drop table if exists cart_items cascade;
drop table if exists orders cascade;

create table if not exists carts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID not null,
    created_at DATE not null default CURRENT_DATE,
    updated_at DATE not null default CURRENT_DATE,
    status status_enum not null default 'OPEN'
);
create table if not exists cart_items (
    cart_id UUID REFERENCES carts (id),
    product_id UUID,
    count INTEGER not null
);
create table if not exists orders (
	id UUID,
	user_id UUID,
    cart_id UUID REFERENCES carts (id),
    payment JSON,
    delivery JSON,
    comments text,
    status status_enum,
    total numeric(10,2) not null
);
