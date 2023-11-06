  package app.roles;

import jakarta.persistence.*;


@Entity
@Table(name="Users")
public  class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;
	private String username;
	private String password;
	private String name;
	private String surname;
	
	public User(String username, String password, String name, String surname) {
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

	public Role getRole() {
		return null;
	}

}
