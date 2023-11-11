package app.roles;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{
	
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder encoder;

	
	@Autowired
	public UserService(UserRepository userRepository, BCryptPasswordEncoder encoder) {
		this.userRepository = userRepository;
		this.encoder = encoder;
	}
	
	 public List<User> getUsers() {
		 return userRepository.findAll();
	 }
	 
	 public void addUser(User user) {
		 checkUserDataValid(user);
		 userRepository.save(user);
	 }

	 public void changeInfo(User userup){

		Optional<User> user1=userRepository.findById(userup.getId());
		if (!user1.isPresent()) throw new IllegalArgumentException("New values not provided.");
		User user = user1.get();
		user.setName(userup.getName());
		user.setPassword(encoder.encode(userup.getPassword()));
		user.setSurname(userup.getSurname());
		user.setUsername(userup.getUsername());
		
		if (userup instanceof SpecialUser) {
			SpecialUser specialUser = (SpecialUser) user;
			SpecialUser specialUserUp = (SpecialUser) userup;
			specialUser.setPhoto_url(specialUserUp.getPhoto_url());
			specialUser.setBiography(specialUserUp.getBiography());
			specialUser.setEmail(specialUserUp.getEmail());
			user = specialUser;
		}

		userRepository.save(user);

	 }

	private void checkUserDataValid(User user) {
		// TODO Auto-generated method stub
		if (user instanceof SpecialUser) {
			Optional<SpecialUser> optionalUserEmail = userRepository.findUserByEmail(((SpecialUser)user).getEmail());
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
