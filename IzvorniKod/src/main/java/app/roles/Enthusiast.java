package app.roles;

import jakarta.persistence.Entity;

@Entity
public class Enthusiast extends User {

	private String photo_url;
	private String biography;
	private String email;
	
	public Enthusiast(String username, String password, String name, String surname, String photo_url, String biography, String email) {
		super(username, password, name, surname);
		// TODO Auto-generated constructor stub
		this.photo_url = photo_url;
		this.biography = biography;
		this.email = email;
	}

	@Override
	public Role getRole() {
		// TODO Auto-generated method stub
		return Role.ENTHUSIAST;
	}

	public String getPhoto_url() {
		return photo_url;
	}

	public String getBiography() {
		return biography;
	}

	public String getEmail() {
		return email;
	}
	
	

}
