package app.dto;

import app.roles.SpecialUser;

public class SpecialUserDTO extends UserDTO{
	
	public String biography;
	public String email;
	
	public SpecialUserDTO(SpecialUser u) {
		super(u);
		this.biography = u.getBiography();
		this.email = u.getEmail();
		// TODO Auto-generated constructor stub
	}

	
}
