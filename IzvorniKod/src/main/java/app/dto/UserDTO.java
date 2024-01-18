package app.dto;

import app.roles.User;

public class UserDTO {
	
	public int id;
	public String name;
	public String surname;
	public String username;
	public String password;
	public String role;
	
	public UserDTO(User u) {
		
		this.id = u.getId();
		this.name = u.getName();
		this.surname = u.getSurname();
		this.username = u.getUsername();
		this.password = u.getPassword();
		this.role = u.getRole().getName();
	}
	
	
}
