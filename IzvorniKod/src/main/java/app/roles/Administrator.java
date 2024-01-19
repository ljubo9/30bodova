package app.roles;

public class Administrator extends User {
	
	
	public Administrator(String username, String password, String name, String surname, String email) {
		super(username, password, name, surname, Role.ADMIN, email);
		// TODO Auto-generated constructor stub
	}
	
}
