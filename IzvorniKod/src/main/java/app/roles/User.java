  package app.roles;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import app.recipe.Cookbook;
import app.recipe.Recipe;
import app.recipe.Response;
import app.recipe.Review;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

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
	
	@ManyToOne
	private Role role;
	
	@OneToMany(mappedBy="creator", cascade = CascadeType.ALL)
	private Set<Recipe> recipes;
	@OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
	private Set<Cookbook> cookbooks;

	@OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
	private List<Review> reviews;

	@OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
	private List<Response> responses;

	
	private User(String username, String password, String name, String surname) {
		// TODO Auto-generated constructor stub
		if (username == null || password == null ||
		    name == null || surname == null) throw new IllegalArgumentException("All fields must be filled out");
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.role = null;
	}
	
	public User(String username, String password, String name, String surname, Role role) {
		// TODO Auto-generated constructor stub
		this(username, password, name, surname);
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

}
