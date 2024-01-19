package app.roles;

import jakarta.persistence.Entity;

@Entity
public class Client extends User {

	
	public Client(String username, String password, String name, String surname, String email) {
		super(username, password, name, surname, Role.CLIENT, email);
		// TODO Auto-generated constructor stub
	}


	public Client() {
		
	}

}
