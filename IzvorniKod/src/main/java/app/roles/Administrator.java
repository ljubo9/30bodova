package app.roles;

public class Administrator extends User {
	private String email;
	
	public Administrator(String username, String password, String name, String surname,String email) {
		super(username, password, name, surname);
		this.email = email;
		// TODO Auto-generated constructor stub
	}
	
}
