package app.roles;

import jakarta.persistence.Entity;

@Entity
public class Nutritionist extends SpecialUser {
	
	public Nutritionist(String username, String password, String name, String surname, String photo_url, String biography, String email) {
		super(username, password, name, surname, photo_url, biography, email);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Role getRole() {
		// TODO Auto-generated method stub
		return Role.NUTRITIONIST;
	}

}
