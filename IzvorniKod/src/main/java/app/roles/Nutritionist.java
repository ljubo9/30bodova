package app.roles;

import jakarta.persistence.Entity;

@Entity
public class Nutritionist extends SpecialUser {
	
	public Nutritionist(String username, String password, String name, String surname, String photo_url, String biography, String email) {
		super(username, password, name, surname, Role.NUTRITIONIST, photo_url, biography, email);
		// TODO Auto-generated constructor stub
	}

}
