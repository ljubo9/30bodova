package app.roles;

import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	private final UserService userService;
	private final BCryptPasswordEncoder encoder;
	private final AuthenticationManager authenticationManager;
	
	
	@Autowired
	public UserController(UserService userService, BCryptPasswordEncoder encoder,
						  AuthenticationManager authenticationManager) {
		 this.userService = userService;
		 this.encoder = encoder;
		 this.authenticationManager = authenticationManager;
	}
	
	@PostMapping(path = "/register")
	public void registerNewUser(@RequestBody final AuthorizationForm form) {
		User user;
		String encodedPassword = encoder.encode(form.getPassword());
		if (form.getRole() == Role.CLIENT) {
			user = new Client(form.getUsername(), encodedPassword, form.getName(),
							form.getSurname());
		}
		else {
			user = new SpecialUser(form.getUsername(), encodedPassword, form.getName(),
					form.getSurname(), form.getRole(), form.getPhoto_url(), form.getBiography(), form.getEmail());
		}
		userService.addUser(user);
	}
	
	@PostMapping(path = "/login")
	public String login(@RequestBody final AuthorizationForm form) throws AuthenticationException {
		Authentication authReq = UsernamePasswordAuthenticationToken.unauthenticated(form.getUsername(), form.getPassword());
		Authentication authRes = authenticationManager.authenticate(authReq);
		if (!authRes.isAuthenticated()) throw new AuthenticationException("Wrong username or password.");
		return "redirect:/home";
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
