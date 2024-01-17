

INSERT INTO public."role"
(id, "name")
VALUES(1, 'CLIENT');

INSERT INTO public."role"
(id, "name")
VALUES(2, 'ENTHUSIAST');

INSERT INTO public."role"
(id, "name")
VALUES(3, 'NUTRITIONIST');

INSERT INTO public."role"
(id, "name")
VALUES(4, 'ADMIN');

insert into public."users"
(dtype, id, "name", "password", "surname", "username", role_id)
VALUES('User', 1, 'client', '$2a$10$r7oB7KBo2dCmfRedkH5YcO8YWzdUyIcLk9/GuoWjgtRr1Y15h1tmW', 'client', 'client', 1);


insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('SpecialUser', 2, 'enthusiast', '$10$keSxcf1m1tBh6ep0EOnz8e1EMryiEozv4f5ztHr9ybt85YVipNWj2', 'enthusiast', 'enthusiast', 'enthusiast', false, 'enthusiast@gmail.com', 2);

insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('SpecialUser', 3, 'nutritionist', '$2a$10$vlnthKoYaXs9xXFvz2SFbOdDDKWHXax4lXv5e1Ct2WDNytgFW8mmq', 'nutritionist', 'nutritionist', 'nutritionist', false, 'nutritionist@gmail.com', 3);


insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('SpecialUser', 4, 'admin', '$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om', 'admin', 'admin', 'admin', true, 'admin@gmail.com', 4);


insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('SpecialUser', 5, 'marko', '$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om', 'markic', 'marko19', 'ja sam marko', true, 'marko@gmail.com', 2);


insert into public."diet"
(id, "name", "opis", creator_id)
VALUES(1, 'bolonjez dijeta', 'bolonjez dijeta', 1);

insert into public."users"
(dtype, id, "name", "password", "surname", "username", role_id, diet_id)
VALUES('User', 6, 'iva', '$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om', 'ivic', 'iva25', 1, 1);

insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(1, 30, 'bolonjez', 'talijanska', 2, 5);


insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(2, 60, 'lazanje', 'talijanska', 4, 5);

insert into public."ingredient"
(id, "name")
VALUES(1, 'meso');

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 1, 1);

insert into public."ingredient"
(id, "name")
VALUES(2, 'sir');

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 2, 2);

insert into public."step_of_making"
(id, "description", step_num, recipe_id)
VALUES(1, 'skuhaj paštu', 1, 1);

insert into public."recipe_steps_of_making"
(recipe_id, steps_of_making_id)
VALUES(1, 1);

insert into public."step_of_making"
(id, "description", step_num, recipe_id)
VALUES(2, 'složi listiće', 1, 2);

insert into public."recipe_steps_of_making"
(recipe_id, steps_of_making_id)
VALUES(2, 2);

insert into public."diet_users"
(users_id, diet_id)
VALUES(4, 1);

insert into public."diet_users"
(users_id, diet_id)
VALUES(5, 1);

insert into public."cookbook"
(id, "category", "name", creator_id)
VALUES(1, 'talijanska', 'mesna jela', 1);

insert into public."cookbook_recipes"
(cookbook_id, recipe_id)
VALUES (1, 1);


insert into public."cookbook_recipes"
(cookbook_id, recipe_id)
VALUES (1, 2);


