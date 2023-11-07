package app.roles;

public class SpecialUser extends User{

	private String photo_url;
	private String biography;
	private String email;
	private boolean confirmed;
	
	public SpecialUser(String username, String password, String name, String surname, String photo_url, String biography, String email) {
		this(username, password, name, surname, null, photo_url, biography, email);
	}
	
	public SpecialUser(String username, String password, String name, String surname, Role role,  String photo_url, String biography, String email) {
		super(username, password, name, surname, role);
		// TODO Auto-generated constructor stub
		if (photo_url == null || biography == null || email == null) throw new IllegalArgumentException("All fields must be filled out.");
		this.photo_url = photo_url;
		this.biography = biography;
		this.email = email;
		this.confirmed = false;
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
	
	
	
	public void setPhoto_url(String photo_url) {
		this.photo_url = photo_url;
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
