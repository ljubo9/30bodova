package app.roles;


public class AuthorizationForm {
	
	private String username;
	private String password;
	private String name;
	private String surname;
	private Role role;
	private String photo_url;
	private String biography;
	private String email;
	
	public AuthorizationForm(String username, String password, String name, String surname, Role role,  String photo_url, String biography, String email) {
		// TODO Auto-generated constructor stub
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.role = null;
		this.photo_url = photo_url;
		this.biography = biography;
		this.email = email;
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
		return role;
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
