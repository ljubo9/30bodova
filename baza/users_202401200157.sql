INSERT INTO public.users (dtype,confirmed,email,"name","password",surname,username,biography,diet_id,role_id,image_id) VALUES
	 ('Client',true,'client','client','$2a$10$r7oB7KBo2dCmfRedkH5YcO8YWzdUyIcLk9/GuoWjgtRr1Y15h1tmW','client','client',NULL,NULL,1,NULL),
	 ('Enthusiast',true,'enthusiast@gmail.com','enthusiast','$2a$10$Sd3hzVJFgT.cmYHfHEDl1edqh/a3Z05SK0lLZrUNrbyNP8Z/cZGW2','enthusiast','enthusiast','enthusiast',NULL,2,NULL),
	 ('Nutritionist',true,'nutritionist@gmail.com','nutritionist','$2a$10$vlnthKoYaXs9xXFvz2SFbOdDDKWHXax4lXv5e1Ct2WDNytgFW8mmq','nutritionist','nutritionist','nutritionist',NULL,3,NULL),
	 ('Enthusiast',true,'admin@gmail.com','admin','$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om','admin','admin','admin',NULL,4,NULL),
	 ('Enthusiast',true,'marko@gmail.com','marko','$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om','markic','marko19','ja sam marko',NULL,2,NULL),
	 ('Client',true,'iva','iva','$2a$10$9dERkNAb3Y5VYaR1drQWie3iuq2ZweVUJiYTzLmDtjFEenQ/EZ0om','ivic','iva25',NULL,1,1,NULL),
	 ('Client',false,'anonymous','anonymous','anonymous','anonyous','anonymous',NULL,NULL,1,NULL);
