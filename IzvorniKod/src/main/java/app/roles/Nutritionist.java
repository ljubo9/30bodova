package app.roles;

import jakarta.persistence.Entity;

@Entity
public class Nutritionist extends User {

	public Nutritionist(String username, String password, String name, String surname,String email) {
		super(username, password, name, surname,email);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Role getRole() {
		// TODO Auto-generated method stub
		return Role.NUTRITIONIST;
	}

}
