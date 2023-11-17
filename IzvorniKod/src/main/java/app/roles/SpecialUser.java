package app.roles;

import app.recipe.Image;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class SpecialUser extends User{

	@OneToOne(cascade = CascadeType.ALL)
	private Image photo;
	private String biography;
	private String email;
	private boolean confirmed;
	
	public SpecialUser(String username, String password, String name, String surname, Image photo, String biography, String email) {
		this(username, password, name, surname, null, photo, biography, email);
	}
	
	public SpecialUser(String username, String password, String name, String surname, Role role,  Image photo, String biography, String email) {
		super(username, password, name, surname, role);
		// TODO Auto-generated constructor stub
		if (photo == null || biography == null || email == null) throw new IllegalArgumentException("All fields must be filled out.");
		this.photo = photo;
		this.biography = biography;
		this.email = email;
		this.confirmed = false;
	}
	
	public SpecialUser() {
		
	}
	
	

	public Image getPhoto_url() {
		return photo;
	}

	public String getBiography() {
		return biography;
	}

	public String getEmail() {
		return email;
	}
	
	
	
	public Image getPhoto() {
		return photo;
	}

	public void setPhoto(Image photo) {
		this.photo = photo;
	}

	public void setPhoto_url(Image photo) {
		this.photo = photo;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isConfirmed() {
		return confirmed;
	}

	public void setConfirmed(boolean confirmed) {
		this.confirmed = confirmed;
	}
	
	
}
