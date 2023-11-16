package app.roles;

import app.recipe.Image;
import jakarta.persistence.Entity;

@Entity
public class Enthusiast extends SpecialUser {

	
	public Enthusiast(String username, String password, String name, String surname, Image photo, String biography, String email) {
		super(username, password, name, surname, Role.ENTHUSIAST, photo, biography, email);
		// TODO Auto-generated constructor stub
	}

}
