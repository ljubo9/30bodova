package app.controller;

import app.recipe.Diet;
import app.service.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.dto.DietDTO;
import app.roles.User;
import app.service.UserService;

@RestController
@RequestMapping()
public class DietController {

	@Autowired
	private final DietService dietService;
	private final UserService userService;
	
	public DietController(DietService dietService, UserService userService) {
		this.dietService = dietService;
		this.userService = userService;
	}
	
	@GetMapping(path = "/diet/user/{username}")
	public ResponseEntity<DietDTO> getUserDiet(@PathVariable String username) {
		try {
			User u = (User) userService.loadUserByUsername(username);
			if (u == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			Diet diet = u.getDiet();
			if (diet == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			DietDTO dietdto = new DietDTO(diet);
			return new ResponseEntity<>(dietdto, HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
