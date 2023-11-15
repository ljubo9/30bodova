package app.roles;

import app.roles.Client;

public class AuthorizationForm {
	
	private String username;
	private String password;
	private String name;
	private String surname;
	private Role role;
	private String photo_url;
	private String biography;
	private String email;
	
	public AuthorizationForm(String username, String password, String name, String surname, String role,  String photo_url, String biography, String email) {
		// TODO Auto-generated constructor stub
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		if (role.equalsIgnoreCase("client")) {
			this.role = Role.CLIENT;
		}
		else if (role.equalsIgnoreCase("nutritionist")) {
			this.role = Role.NUTRITIONIST;
		}
		else if (role.equalsIgnoreCase("enthusiast")) {
			this.role = Role.ENTHUSIAST;
		}
		this.photo_url = photo_url;
		this.biography = biography;
		this.email = email;
	}
	
	public AuthorizationForm(String username, String password, String name, String surname, String role, String biography, String email) {
		this(username, password, name, surname, role, null, biography, email);
	}

	public AuthorizationForm() {
		
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

	public String getBiography() {
		return biography;
	}

	public String getEmail() {
		return email;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getPhoto_url() {
		return photo_url;
	}

	public void setPhoto_url(String photo_url) {
		this.photo_url = photo_url;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	public void setRole(String role) {
		if (role.equalsIgnoreCase("client")) {
			this.role = Role.CLIENT;
		}
		else if (role.equalsIgnoreCase("nutritionist")) {
			this.role = Role.NUTRITIONIST;
		}
		else if (role.equalsIgnoreCase("enthusiast")) {
			this.role = Role.ENTHUSIAST;
		}
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public static User parseUser(AuthorizationForm form) {
		if (form == null) throw new NullPointerException("Reference to form is null.");
		if (form.getRole().getName().equals("CLIENT")) {
			return new Client(form.getUsername(), form.getPassword(), form.getName(), form.getSurname());
		}
		return new SpecialUser(form.getUsername(), form.getPassword(), form.getName(),
				form.getSurname(), form.getRole(), form.getPhoto_url(), form.getBiography(), form.getEmail());
		
	}
	
	
	
}
