package app.roles;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
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

	 public void changeInfo(User userup){

		Optional<User> user1=userRepository.findById(userup.getId());
		User user = user1.get();

		user.setName(userup.getName());
		user.setEmail(userup.getEmail());
		user.setPassword(userup.getPassword());
		user.setSurname(userup.getSurname());
		user.setUsername(userup.getUsername());

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
}
