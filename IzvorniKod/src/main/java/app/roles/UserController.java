package app.roles;

import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
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
		user = AuthorizationForm.parseUser(form);
		userService.addUser(user);
	}
	
	@PostMapping(path = "/login")
	public String login(@RequestBody final AuthorizationForm form) throws AuthenticationException {
		Authentication authReq = UsernamePasswordAuthenticationToken.unauthenticated(form.getUsername(), form.getPassword());
		Authentication authRes = authenticationManager.authenticate(authReq);
		if (!authRes.isAuthenticated()) throw new AuthenticationException("Wrong username or password.");
		return "redirect:/home";
	}

	@PostMapping(path = "/profile/changeInfo")
	public String changeInfo(@RequestBody AuthorizationForm updatedUser, @RequestBody int id) throws AuthenticationException{
		User currentUser = userService.loadUserById(id);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!auth.isAuthenticated()) return "redirect:/login";
		userService.changeInfo(AuthorizationForm.parseUser(updatedUser));
		return "redirect:/profile";
	}
	
}
