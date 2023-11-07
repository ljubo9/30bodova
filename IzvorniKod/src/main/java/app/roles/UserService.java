package app.roles;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{
	
	private final UserRepository userRepository;
	
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	 public List<User> getUsers() {
		 return userRepository.findAll();
	 }
	 
	 public void addUser(User user) {
		 checkUserDataValid(user);
		 userRepository.save(user);
	 }

	private void checkUserDataValid(User user) {
		// TODO Auto-generated method stub
		if (user instanceof SpecialUser) {
			Optional<User> optionalUserEmail = userRepository.findUserByEmail(((SpecialUser)user).getEmail());
			if (optionalUserEmail.isPresent()) throw new IllegalStateException("Account with this email already exists");
		}
		
		Optional<User> optionalUserUsername = userRepository.findUserByUsername(user.getUsername());
		if (optionalUserUsername.isPresent()) throw new IllegalStateException("Account with this username already exists");
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		Optional<User> user = userRepository.findUserByUsername(username);
		if (!user.isPresent()) return null;
		return user.get();
	}
}
