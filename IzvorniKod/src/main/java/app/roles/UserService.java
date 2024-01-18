package app.roles;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
	 
	 public boolean registerUser(User user) {
		 try {
			 user.setPassword(encoder.encode(user.getPassword()));
			 checkUserDataValid(user);
			 userRepository.save(user);
			 return true;
		 }
		 catch (Exception e) {
			 return false;
		 }
	 }
	 

	 public void changeInfo(User userup){

		Optional<User> user1=userRepository.findById(userup.getId());
		if (!user1.isPresent()) throw new IllegalArgumentException("Cannot update non-existent user.");
		User user = user1.get();
		user.setName(userup.getName());
		user.setPassword(encoder.encode(userup.getPassword()));
		user.setSurname(userup.getSurname());
		user.setUsername(userup.getUsername());

		if (userup instanceof SpecialUser) {
			SpecialUser specialUser = (SpecialUser) user;
			SpecialUser specialUserUp = (SpecialUser) userup;
			specialUser.setPhoto_url(specialUserUp.getImage());
			specialUser.setBiography(specialUserUp.getBiography());
			specialUser.setEmail(specialUserUp.getEmail());
			user = specialUser;
		}
		
		userRepository.deleteById(user.getId());
		checkUserDataValid(user);
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
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		Optional<User> user = userRepository.findUserByUsername(username);
		if (!user.isPresent()) return null;
		return user.get();
	}

	public User loadUserById(int id) {
		Optional<User> user = userRepository.findById(id);
		if (!user.isPresent()) return null;
		return user.get();
	}

	public List<Enthusiast> loadAllEnthusiasts() {
		List<User> users = userRepository.findAll();
		List<Enthusiast> enthusiasts = new ArrayList<>();
		for (User user : users) {
			if (user.getRole().equals(Role.ENTHUSIAST)) {
				Enthusiast en = (Enthusiast) user;
				enthusiasts.add(en);
			}
		}
		return enthusiasts;
	}

	public User loginUser(String username, String password) {
		// TODO Auto-generated method stub
		Optional<User> u = userRepository.findUserByUsername(username);
		if (u.isEmpty()) return null;
		if (!encoder.matches(password, u.get().getPassword())) return null;
		return u.get();
	}

	public void removeUser(User oldUser) {
		// TODO Auto-generated method stub
		userRepository.deleteById(oldUser.getId());
	}
}
