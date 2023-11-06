package app.roles;

import jakarta.persistence.Entity;

@Entity
public class Enthusiast extends User {

	public Enthusiast(String username, String password, String name, String surname) {
		super(username, password, name, surname);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Role getRole() {
		// TODO Auto-generated method stub
		return Role.ENTHUSIAST;
	}

}
