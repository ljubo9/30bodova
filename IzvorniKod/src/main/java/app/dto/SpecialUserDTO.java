package app.dto;

import app.roles.SpecialUser;
import app.roles.User;

public class SpecialUserDTO extends UserDTO{
	
	public String biography;
	public String email;
	
	public SpecialUserDTO(SpecialUser u) {
		super(u);
		this.biography = u.getBiography();
		this.email = u.getEmail();
		// TODO Auto-generated constructor stub
	}

	public SpecialUserDTO(User e) {
		// TODO Auto-generated constructor stub
		this((SpecialUser) e); 
	}

	
}
