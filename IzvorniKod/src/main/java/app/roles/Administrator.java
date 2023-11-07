package app.roles;

public class Administrator extends User {
	
	public Administrator(String username, String password, String name, String surname) {
		super(username, password, name, surname);
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public Role getRole() {
		return Role.ADMIN;
	}

}
