  package app.roles;

import jakarta.persistence.*;


@Entity
@Table(name="Users",uniqueConstraints = @UniqueConstraint(columnNames = {"username","email"}))
public  class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;
	private String username;
	private String password;
	private String name;
	private String surname;
	private String email;
	
	public User(String username, String password, String name, String surname,String email) {
		// TODO Auto-generated constructor stub
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.email=email;
		
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
	public int getId() {return Id;}
	public String getEmail() {return email;}

	public Role getRole() {
		return null;
	}

}
