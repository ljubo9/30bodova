package app.roles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		 this.userService = userService;
	}
	
	@PostMapping(path = "/register")
	public void registerNewUser(@RequestBody final User user) {
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
