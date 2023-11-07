  package app.roles;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;



@Entity 
@Table(name="Users", uniqueConstraints = @UniqueConstraint(columnNames = {"username", "email"}))
@Inheritance
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
	private int Id;
	private String username;
	private String password;
	private String name;
	private String surname;
	private String email;
	@Enumerated(EnumType.STRING)
	private Role role;
	
	public User(String username, String password, String name, String surname,String email) {
		// TODO Auto-generated constructor stub
		if (username == null || password == null ||
		    name == null || surname == null) throw new IllegalArgumentException("All fields must be filled out");
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.role = null;
		this.email=email;
	}
	public User(){

	}
	public User(String username, String password, String name, String surname,String email, Role role) {
		// TODO Auto-generated constructor stub
		this(username, password, name, surname,email);
		this.role = role;
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
	public int getId() {return Id;}
	
	public Role getRole() {
		return role;
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

	public void setEmail(String email) {
		this.email = email;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(role.name())); 
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
