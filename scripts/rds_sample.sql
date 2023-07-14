delete from carts;
delete from cart_items;
delete from orders;

INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
  ('c8b7d073-0536-4805-83e0-abc8df5fdda2', 'B24051E8-4154-4B33-A540-7FDF6F795C3C', '2023-07-04', '2023-07-07', 'OPEN'),
  ('a73dfda3-a71d-4367-994d-f2bb3ef0bd7d', 'B24051E8-4154-4B33-A540-7FDF6F795C4C', '2023-07-05', '2023-07-08', 'ORDERED'),
  ('d70c1c51-a333-49c7-8329-52088bf80b12', 'B24051E8-4154-4B33-A540-7FDF6F795C5C', '2023-07-06', '2023-07-09', 'OPEN');
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
  ('c8b7d073-0536-4805-83e0-abc8df5fdda2', '1e381dce-c56e-4947-85e6-f1c3216994c9', 1),
  ('c8b7d073-0536-4805-83e0-abc8df5fdda2', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 3),
  ('a73dfda3-a71d-4367-994d-f2bb3ef0bd7d', '7567ec4b-b10c-48c5-9345-fc73c48a80a1', 5),
  ('a73dfda3-a71d-4367-994d-f2bb3ef0bd7d', '1e381dce-c56e-4947-85e6-f1c3216994c9', 1),
  ('a73dfda3-a71d-4367-994d-f2bb3ef0bd7d', 'e631dc49-1abf-474c-b188-e7f3fac9d1e7', 1),
  ('d70c1c51-a333-49c7-8329-52088bf80b12', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 2);

