package app.roles;

import jakarta.persistence.Entity;

@Entity
public class Client extends User {

	public Client(String username, String password, String name, String surname,String email) {
		super(username, password, name, surname,email);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Role getRole() {
		// TODO Auto-generated method stub
		return Role.CLIENT;
	}

}
