package app.roles;

import org.springframework.beans.factory.annotation.Autowired;
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
	
}
