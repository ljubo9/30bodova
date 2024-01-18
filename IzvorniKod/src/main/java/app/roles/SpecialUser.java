package app.roles;

import app.recipe.Image;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class SpecialUser extends User{

	@OneToOne(cascade = CascadeType.ALL)
	private Image image;
	private String biography;
	private String email;
	private boolean confirmed;
	
	public SpecialUser(String username, String password, String name, String surname, Image photo, String biography, String email) {
		this(username, password, name, surname, null, photo, biography, email);
	}
	
	public SpecialUser(String username, String password, String name, String surname, Role role,  Image photo, String biography, String email) {
		super(username, password, name, surname, role);
		// TODO Auto-generated constructor stub
		//if (photo == null || biography == null || email == null) throw new IllegalArgumentException("All fields must be filled out.");
		this.image= photo;
		this.biography = biography;
		this.email = email;
		this.confirmed = false;
	}
	
	public SpecialUser() {
		
	}
	
	


	public String getBiography() {
		return biography;
	}

	public String getEmail() {
		return email;
	}
	
	
	
	public Image getImage() {
		return image;
	}

	public void setPhoto(Image photo) {
		this.image = photo;
	}

	public void setPhoto_url(Image photo) {
		this.image = photo;
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
