

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
(id, "name", "password", "surname", "username", role_id, diet_id)
VALUES(1, "client", "$2a$10$r7oB7KBo2dCmfRedkH5YcO8YWzdUyIcLk9/GuoWjgtRr1Y15h1tmW", "client", "client", 1, 1)


insert into public."users"
(id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id, diet_id)
VALUES(2, "enthusiast", "$10$keSxcf1m1tBh6ep0EOnz8e1EMryiEozv4f5ztHr9ybt85YVipNWj2", "enthusiast", "enthusiast", "enthusiast", false, "enthusiast@gmail.com", 2, 2)

insert into public."users"
(id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id, diet_id)
VALUES(3, "nutritionist", "$2a$10$vlnthKoYaXs9xXFvz2SFbOdDDKWHXax4lXv5e1Ct2WDNytgFW8mmq", "nutritionist", "nutritionist", "nutritionist", false, "nutritionist@gmail.com", 3, 3)


insert into public."users"
(id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id, diet_id)
VALUES(4, "admin", "$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om", "admin", "admin", "admin", true, "admin@gmail.com", 4, 4)


insert into public."users"
(id, "name", "password", "surname", "username", "biography", "confirmed", "email", role_id, diet_id)
VALUES(5, "marko", "$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om", "markic", "marko19", "ja sam marko", true, "marko@gmail.com", 2, 1)


insert into public."users"
(id, "name", "password", "surname", "username", role_id, diet_id)
VALUES(1, "iva", "$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om", "ivic", "iva25", 1, 3)

insert into public."ingredient"
(id, "name")
VALUES(2, "sir")

insert into public."ingredient"
(id, "name")
VALUES(3, "pileća prsa")

insert into public."ingredient"
(id, "name")
VALUES(4, "maslinovo ulje")

insert into public."ingredient"
(id, "name")
VALUES(5, "sol")

insert into public."ingredient"
(id, "name")
VALUES(6, "papar")

insert into public."ingredient"
(id, "name")
VALUES(7, "crvena paprika")

insert into public."ingredient"
(id, "name")
VALUES(8, "rajčica")

insert into public."ingredient"
(id, "name")
VALUES(9, "mrkva")

insert into public."ingredient"
(id, "name")
VALUES(10, "mlijeko")

insert into public."ingredient"
(id, "name")
VALUES(11, "maslac")

insert into public."ingredient"
(id, "name")
VALUES(12, "brokula")

insert into public."ingredient"
(id, "name")
VALUES(13, "tjestenina")

insert into public."ingredient"
(id, "name")
VALUES(14, "luk")

insert into public."ingredient"
(id, "name")
VALUES(15, "češnjak")

insert into public."ingredient"
(id, "name")
VALUES(16, "brašno")

insert into public."ingredient"
(id, "name")
VALUES(17, "banana")

insert into public."ingredient"
(id, "name")
VALUES(18, "limun")

insert into public."ingredient"
(id, "name")
VALUES(19, "krumpir")


insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(1, 30, "bolonjez", "talijanska", 2, 5)


insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(2, 60, "lazanje", "talijanska", 4, 5)

insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(3, 60, "Piletina s povrćem na žaru", "slano", 4, 5)

insert into public."recipe"
(id, cook_time, "name", "category", portion_size, creator_id)
VALUES(3, 60, "Vegeterijanski pire od krumpira s povrćem", "slano", 5, 5)


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(500, 1, 1, 1)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(2, 3, 3, 2)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 3, 4, 3)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 3, 5, 4)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 3, 6, 5)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 3, 7, 6)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 3, 8, 7)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(2, 3, 9, 8)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(800, 4, 19, 9)

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(100, 4, 10, 10)


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(50, 4, 11, 11)


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 4, 9, 12)


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 4, 12, 13)


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 4, 7, 14)


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 4, 5, 15)


insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 4, 6, 16)


insert into public."ingredient"
(id, "name")
VALUES(1, 'meso')

insert into public."recipe_ingredient"
("quantity", recipe_id, ingredient_id, id)
VALUES(1, 2, 2, 2)

insert into public."step_of_making "
(id, "description", step_num, recipe_id)
VALUES(1, "skuhaj paštu", 1, 1)

insert into public."recipe_step_of_making"
(recipe_id, steps_of_making_id)
VALUES(1, 1)

insert into public."step_of_making "
(id, "description", step_num, recipe_id)
VALUES(2, "složi listiće", 1, 2)

insert into public."recipe_step_of_making"
(recipe_id, steps_of_making_id)
VALUES(2, 2)

insert into public."diet"
(id, "name", "opis", creator_id)
VALUES(1, "bolonjez dijeta", "bolonjez dijeta", 1)

insert into public."diet_users"
(users_id, diet_id)
VALUES(4, 1)

insert into public."diet_users"
(users_id, diet_id)
VALUES(5, 1)

insert into public."cookbook"
(id, "category", "name", creator_id)
VALUES(1, "talijanska", "mesna jela", 1)

insert into public."cookbook_recipes"
(cookbook_id, recipe_id)
VALUES (1, 1)


insert into public."cookbook_recipes"
(cookbook_id, recipe_id)
VALUES (1, 2)


