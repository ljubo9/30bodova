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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
	
	@PostMapping(path = "/register", consumes = "multipart/form-data")
	public void registerNewUser(@RequestParam("model") String model, @RequestParam("img") MultipartFile image) {
		
		User user;
		ObjectMapper mapper = new ObjectMapper();
		AuthorizationForm form;
		try {
			form = mapper.readValue(model, AuthorizationForm.class);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new IllegalArgumentException();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new IllegalArgumentException();

		}
		String encodedPassword = encoder.encode(form.getPassword());
		form.setPassword(encodedPassword);
		form.setPhoto_url(image.getOriginalFilename());
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
