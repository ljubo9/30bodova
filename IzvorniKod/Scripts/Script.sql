

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
(dtype, id, "name", "password", "surname", "username", role_id, "confirmed")
VALUES('Client', 1, 'client', '$2a$10$r7oB7KBo2dCmfRedkH5YcO8YWzdUyIcLk9/GuoWjgtRr1Y15h1tmW', 'client', 'client', 1, true);


insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "email", role_id, "confirmed")
VALUES('Enthusiast', 2, 'enthusiast', '$2a$10$Sd3hzVJFgT.cmYHfHEDl1edqh/a3Z05SK0lLZrUNrbyNP8Z/cZGW2', 'enthusiast', 'enthusiast', 'enthusiast', 'enthusiast@gmail.com', 2, true);

insert into public."users"
(dtype, id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id)
VALUES('Nutritionist', 3, 'nutritionist', '$2a$10$vlnthKoYaXs9xXFvz2SFbOdDDKWHXax4lXv5e1Ct2WDNytgFW8mmq', 'nutritionist', 'nutritionist', 'nutritionist', true, 'nutritionist@gmail.com', 3);


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
(dtype, id, "name", "password", "surname", "username", role_id, diet_id, "confirmed")
VALUES('Client', 6, 'iva', '$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om', 'ivic', 'iva25', 1, 1, true);

insert into public."category"
(id, "name")
VALUES(1, 'obično');

insert into public."category"
(id, "name")
VALUES(2, 'bezglutensko');

insert into public."category"
(id, "name")
VALUES(3, 'vegeterijansko');

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(2, 100, 20, 'sir', 10, 30, 40, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(3, 200, 10, 'pileća prsa', 30, 30, 30, 2 );

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(4, 400, 10, 'maslinovo ulje',40, 20, 40, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(5, 150, 20, 'sol', 40, 40, 30, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(6, 80, 10, 'papar', 10, 30, 10, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(7, 40, 50, 'crvena paprika', 40, 50, 10, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(8, 40, 3, 'rajčica', 8, 14, 50, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(9, 50, 5, 'mrkva', 60, 5, 20, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(10, 120, 60, 'mlijeko', 120, 15, 20, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(11, 300, 40, 'maslac', 15, 200, 25, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(12, 30, 30, 'brokula', 40, 15, 50, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(13, 40, 40, 'tjestenina', 50, 2, 30, 2);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(14, 50, 20, 'luk', 40, 20, 3, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(15, 50, 15, 'češnjak', 24, 20, 30, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(16, 20, 30, 'brašno', 40, 10 ,20 ,2);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(17, 30, 40, 'banana', 50, 100, 20, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(18, 100, 20, 'limun', 30, 400, 20, 1);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(19, 200, 30,'krumpir', 30, 30, 20, 1);


insert into public."recipe"
(id, cook_time, "name", cat_id, portion_size, creator_id)
VALUES(1, 30, 'bolonjez', 1, 2, 5);


insert into public."recipe"
(id, cook_time, "name", cat_id, portion_size, creator_id)
VALUES(2, 60, 'lazanje', 1, 4, 5);


insert into public."recipe"
(id, cook_time, "name", cat_id, portion_size, creator_id)
VALUES(3, 60, 'Piletina s povrćem na žaru', 1, 4, 5);

insert into public."recipe"
(id, cook_time, "name", cat_id, portion_size, creator_id)
VALUES(4, 60, 'Vegeterijanski pire od krumpira s povrćem', 3, 5, 5);

insert into public."ingredient"
(id, "calories", "carbs", "name", "protein", "salt", "saturated_fat", cat_id)
VALUES(1, 40, 50, 'meso', 200, 20, 40, 1);


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


insert into public."cookbook"
(id, category_id, "name", creator_id)
VALUES(1, 1, 'mesna jela', 5);

insert into public."cookbook_recipes"
(cookbook_id, recipe_id)
VALUES (1, 1);


insert into public."cookbook_recipes"
(cookbook_id, recipe_id)
VALUES (1, 2);


