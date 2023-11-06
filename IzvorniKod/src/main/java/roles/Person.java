  package roles;

public abstract class Person {
	private String username;
	private String password;
	private String name;
	private String surname;
	
	public Person(String username, String password, String name, String surname) {
		// TODO Auto-generated constructor stub
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getName() {
		return name;
	}
	public String getSurname() {
		return surname;
	}
	
	public abstract Role getRole();
	
}
