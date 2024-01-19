package app.roles;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;

import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import app.dto.SpecialUserDTO;
import app.dto.UserDTO;
import app.recipe.ConsumedRecipe;
import app.service.EmailService;

@RestController
@RequestMapping
public class UserController {
	
	private final UserService userService;
	private final EmailService emailService;
	
	
	@Autowired
	public UserController(UserService userService, EmailService emailService) {
		 this.userService = userService;
		 this.emailService = emailService;
	}
	
	@PostMapping(path = "/register", consumes = "multipart/form-data")
	public void registerNewUser(@RequestParam("model") String model, @RequestParam("img") Optional<MultipartFile> image) {
		
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
		
		if (image.isPresent()) {
			form.setPhoto_url(image.get().getOriginalFilename());
		}
		user = AuthorizationForm.parseUser(form);
		userService.registerUser(user);

		try {
            emailService.posaljiPotvrdu(user.getEmail());
        } catch (MessagingException | jakarta.mail.MessagingException e) {
		}
	}
	
	@PostMapping(path = "/login", consumes = "multipart/form-data")
	@ResponseBody
	public ResponseEntity<UserDTO> login(@RequestParam("username") String username, @RequestParam("password") String password) throws AuthenticationException {
		
		try {
			User u = userService.loginUser(username, password);
			if (u == null) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			return new ResponseEntity<>(new UserDTO(u), HttpStatus.OK);
		}
		catch (Exception e) {
			System.out.println("Could not log in user:");
			e.printStackTrace();	
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(path = "/profile/changeInfo")
	public String changeInfo(@RequestBody AuthorizationForm updatedUser, @RequestBody int id) throws AuthenticationException{
		/*User currentUser = userService.loadUserById(id);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!auth.isAuthenticated()) return "redirect:/login";
		currentUser.setUsername(username)
		userService.changeInfo(AuthorizationForm.parseUser());
		return "redirect:/profile"; */
		return null;
	}
	
	@GetMapping(path = "/user/{username}")
	public UserDTO getUser(@PathVariable String username) {
		User user = (User) userService.loadUserByUsername(username);
		UserDTO dto= new UserDTO(user);
		return dto;
	}
	
	@PostMapping(path = "/profile/{username}", consumes = "multipart/form-data")
	public ResponseEntity<UserDTO> editUser(@PathVariable String username, @RequestParam("newUsername") String newUsername, @RequestParam("newPassword") String newPassword, @RequestParam("oldPassword") String oldPassword) {
		try {
			User oldUser = (User)userService.loadUserByUsername(username);
			if (oldUser == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			userService.removeUser(oldUser);
			oldUser.setUsername(newUsername);
			oldUser.setPassword(newPassword);
			userService.registerUser(oldUser);
			return new ResponseEntity<>(new UserDTO(oldUser), HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PostMapping(path = "/authenticate", consumes = "multipart/form-data")
	public ResponseEntity authenticate(@RequestParam("username") String username, @RequestParam("password") String password) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!auth.isAuthenticated()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return ResponseEntity.ok(null);
	}
	
	
	@GetMapping(path = "/enthusiasts/{username}")
	public ResponseEntity<SpecialUserDTO> getSpecialUser(@PathVariable String username) {
		try {
			SpecialUser su = (SpecialUser) userService.loadUserByUsername(username);
			if (su == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			SpecialUserDTO dto = new SpecialUserDTO(su);
			return new ResponseEntity<>(dto, HttpStatus.OK);
		}
		catch(Exception e) {
			System.out.println("Could not fetch special user: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	@GetMapping(path = "/followed-enthusiasts/{username}")
	public ResponseEntity<List<SpecialUserDTO>> getFollowedEnthusiasts(@PathVariable String username) {
		try {
			User u = (User) userService.loadUserByUsername(username);
			if (u == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			/** get all enthusiasts from user **/
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);

		}
		catch(Exception e) {
			System.out.println("Could not fetch followed enthusiasts: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(path = "/enthusiasts") 
	public ResponseEntity<List<SpecialUserDTO>> getAllEnthusiasts() {
		try {
			List<Enthusiast> en = userService.loadAllEnthusiasts();
			List<SpecialUserDTO> endto = new ArrayList<>();
			for (User e : en) {
				endto.add(new SpecialUserDTO(e));
			}
			return new ResponseEntity<>(endto, HttpStatus.OK);
		}
		catch(Exception e) {
			System.out.println("Could not fetch all enthusiasts:");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
}
