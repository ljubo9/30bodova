package app.roles;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
	private final UserService userService;
	BCryptPasswordEncoder encoder;
	
	
	@Autowired
	public UserController(UserService userService, BCryptPasswordEncoder encoder) {
		 this.userService = userService;
		 this.encoder = encoder;
	}
	
	@PostMapping(path = "/register")
	public void registerNewUser(@RequestBody final AuthorizationForm form) {
		User user;
		String encodedPassword = encoder.encode(form.getPassword());
		if (form.getRole() == Role.CLIENT) {
			user = new User(form.getUsername(), encodedPassword, form.getName(),
							form.getSurname(), form.getRole());
		}
		else {
			user = new SpecialUser(form.getUsername(), encodedPassword, form.getName(),
					form.getSurname(), form.getRole(), form.getPhoto_url(), form.getBiography(), form.getEmail());
		}
		userService.addUser(user);
	}
	
	@PostMapping(path = "/login")
	public void login() {
		
	}

	@PostMapping(path = "/changeInfo")
	public void changeInfo(@RequestBody final User user) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			userService.changeInfo(user);

		}else {
			throw new IllegalStateException("You need to be logged in to change your info!");
		}

	}
	
}
