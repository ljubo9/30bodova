package app.roles;

import app.recipe.Image;
import jakarta.persistence.Entity;

@Entity
public class Nutritionist extends SpecialUser {
	
	public Nutritionist(String username, String password, String name, String surname, Image photo, String biography, String email) {
		super(username, password, name, surname, Role.NUTRITIONIST, photo, biography, email);
		// TODO Auto-generated constructor stub
	}

}
