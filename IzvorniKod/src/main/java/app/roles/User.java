  package app.roles;

import java.util.Collection;
import java.util.List;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import app.recipe.ConsumedRecipe;
import app.recipe.Diet;
import app.recipe.Response;
import app.recipe.Review;

  @Entity
@Table(name="users", uniqueConstraints = @UniqueConstraint(columnNames = {"username"}))
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class User implements UserDetails {
	
	@Id
	@SequenceGenerator(
			name = "user_sequence",
			sequenceName = "student_sequence",
			allocationSize = 1
	)
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "user_sequence")
	@Column(columnDefinition = "serial", insertable = false)
	private int id;
	private String username;
	private String password;
	private String name;
	private String surname;
	private String email;

	
	public static User ANONYMOUS = new User(1000000, "anonymous", "anonymous", "anonymous", "anonymous", "anonymous");

	@ManyToOne
	private Diet diet;

	@OneToMany(mappedBy = "creator")
	private List<Diet> createdDiets;
	@ManyToOne
	private Role role;

	@OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
	private List<Review> reviews;

	@OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
	private List<Response> responses;

	@OneToMany
	private List<ConsumedRecipe> consumedRecipes;
	
	private boolean confirmed;

	
	public User(String username, String password, String name, String surname, String email) {
		// TODO Auto-generated constructor stub
		if (username == null || password == null ||
		    name == null || surname == null) throw new IllegalArgumentException("All fields must be filled out");
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.role = null;
		this.confirmed = true;
	}
	
	private User(int id, String username, String password, String name, String surname, String email) {
		this(username, password, name, surname, email);
		this.id = id;
	}
	
	public User(String username, String password, String name, String surname, Role role, String email) {
		// TODO Auto-generated constructor stub
		this(username, password, name, surname, email);
		this.role = role;
	}
	

	public User(){}
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
	public int getId() {
		return id;
	}

	
	public Role getRole() {
		return role;
	}

	public void setId(int id){
		this.id = id;
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

	public void setRole(Role role) {
		this.role = role;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(role.getName())); 
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	public List<Review> getReviews() {
		return reviews;
	}

	public List<Response> getResponses() {
		return responses;
	}

	public Diet getDiet() {
		return diet;
	}

	public List<Diet> getCreatedDiets() {
		return createdDiets;
	}

	public List<ConsumedRecipe> getConsumedRecipes() {
		return consumedRecipes;
	}


	public void setConsumedRecipes(List<ConsumedRecipe> consumedRecipes) {
		this.consumedRecipes = consumedRecipes;
	}

	public String getEmail() {
		return email;
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
