package app.dto;

import app.roles.User;

public class UserDTO {
	public String name;
	public String surname;
	public String username;
	public String password;
	
	public UserDTO(User u) {
		this.name = u.getName();
		this.surname = u.getSurname();
		this.username = u.getUsername();
		this.password = u.getPassword();
	}
	
	
}
