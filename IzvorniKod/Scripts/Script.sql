

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
VALUES('Client', 1, 'client', '$2a$10$r7oB7KBo2dCmfRedkH5YcO8YWzdUyIcLk9/GuoWjgtRr1Y15h1tmW', 'client', 'client', 1);


insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('Enthusiast', 2, 'enthusiast', '$2a$10$Sd3hzVJFgT.cmYHfHEDl1edqh/a3Z05SK0lLZrUNrbyNP8Z/cZGW2', 'enthusiast', 'enthusiast', 'enthusiast', false, 'enthusiast@gmail.com', 2);

insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('Nutritionist', 3, 'nutritionist', '$2a$10$vlnthKoYaXs9xXFvz2SFbOdDDKWHXax4lXv5e1Ct2WDNytgFW8mmq', 'nutritionist', 'nutritionist', 'nutritionist', false, 'nutritionist@gmail.com', 3);


insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('Enthusiast', 4, 'admin', '$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om', 'admin', 'admin', 'admin', true, 'admin@gmail.com', 4);


insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('Enthusiast', 5, 'marko', '$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om', 'markic', 'marko19', 'ja sam marko', true, 'marko@gmail.com', 2);


insert into public."diet"
(id, "name", "description", creator_id)
VALUES(1, 'bolonjez dijeta', 'bolonjez dijeta', 1);

insert into public."users"
(dtype, id, "name", "password", "surname", "username", role_id, diet_id)
VALUES('Client', 6, 'iva', '$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om', 'ivic', 'iva25', 1, 1);


insert into public."ingredient"
(id, "name", "energy")
VALUES(2, 'sir', 100);

insert into public."ingredient"
(id, "name", "energy")
VALUES(3, 'pileća prsa', 200);

insert into public."ingredient"
(id, "name", "energy")
VALUES(4, 'maslinovo ulje', 400);

insert into public."ingredient"
(id, "name", "energy")
VALUES(5, 'sol', 150);

insert into public."ingredient"
(id, "name", "energy")
VALUES(6, 'papar', 80);

insert into public."ingredient"
(id, "name", "energy")
VALUES(7, 'crvena paprika', 40);

insert into public."ingredient"
(id, "name", "energy")
VALUES(8, 'rajčica', 40);

insert into public."ingredient"
(id, "name", "energy")
VALUES(9, 'mrkva', 50);

insert into public."ingredient"
(id, "name", "energy")
VALUES(10, 'mlijeko', 120);

insert into public."ingredient"
(id, "name", "energy")
VALUES(11, 'maslac', 300);

insert into public."ingredient"
(id, "name", "energy")
VALUES(12, 'brokula', 30);

insert into public."ingredient"
(id, "name", "energy")
VALUES(13, 'tjestenina', 40);

insert into public."ingredient"
(id, "name", "energy")
VALUES(14, 'luk', 50);

insert into public."ingredient"
(id, "name", "energy")
VALUES(15, 'češnjak', 50);

insert into public."ingredient"
(id, "name", "energy")
VALUES(16, 'brašno', 70);

insert into public."ingredient"
(id, "name", "energy")
VALUES(17, 'banana', 120);

insert into public."ingredient"
(id, "name", "energy")
VALUES(18, 'limun', 100);

insert into public."ingredient"
(id, "name", "energy")
VALUES(19, 'krumpir', 200);


insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(1, 30, 'bolonjez', 'talijanska', 2, 5);


insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(2, 60, 'lazanje', 'talijanska', 4, 5);


insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(3, 60, 'Piletina s povrćem na žaru', 'slano', 4, 5);

insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(4, 60, 'Vegeterijanski pire od krumpira s povrćem', 'slano', 5, 5);

insert into public."ingredient"
(id, "name", energy)
VALUES(1, 'meso', 200);


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(500, 1, 1);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(2, 3, 3);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 3, 4);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 3, 5);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 3, 6);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 3, 7);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 3, 8);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(2, 3, 9);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(800, 4, 19);

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(100, 4, 10);


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(50, 4, 11);


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 4, 9);


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 4, 12);


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 4, 7);


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 4, 5);


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 4, 6);


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id)
VALUES(1, 2, 2);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(1,'2024-01-18', 3, 6);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(2,'2024-01-18', 4, 6);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(3,'2024-01-17', 3, 6);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(4,'2024-01-16', 3, 6);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(5,'2024-01-16', 4, 6);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(6,'2024-01-16', 3, 6);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(7,'2024-01-16', 4, 6);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(8,'2024-01-14', 3, 6);

insert into public."consumed_recipe"
(id, "date", recipe_id, user_id)
values(9,'2024-01-14', 4, 6);

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
VALUES(1, 'talijanska', 'mesna jela', 5);

insert into public."cookbook_recipes"
(cookbook_id, recipe_id)
VALUES (1, 1);


insert into public."cookbook_recipes"
(cookbook_id, recipe_id)
VALUES (1, 2);


