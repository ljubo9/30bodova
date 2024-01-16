package app.recipe;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.dto.RecipeDTO;
import app.roles.User;
import app.roles.UserService;

@RestController
@RequestMapping()
public class RecipeController {

    private final RecipeService recipeService;
    private final UserService userService;
    
    @Autowired
    public RecipeController(RecipeService recipeService, UserService userService) {
        this.recipeService = recipeService;
        this.userService = userService;
    }


    @GetMapping("/recipe/{recipeId}")
    public ResponseEntity<RecipeDTO> getRecipeById(@PathVariable int recipeId) {
        try {
            // Fetch the recipe by ID
            Recipe recipe = recipeService.loadRecipeById(recipeId);

            if (recipe != null) {
                // Convert the Recipe entity to a RecipeDTO
                RecipeDTO recipeDTO = RecipeDTO.fromEntity(recipe);
                return new ResponseEntity<>(recipeDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<RecipeDTO> createRecipe(@RequestBody RecipeDTO recipeDTO) {
        try {
            // Convert the RecipeDTO to a Recipe entity and create the recipe
            Recipe createdRecipe = recipeService.createRecipe(recipeDTO.toEntity());
            RecipeDTO createdRecipeDTO = RecipeDTO.fromEntity(createdRecipe);
            return new ResponseEntity<>(createdRecipeDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping(path = "/cookbooks?creator={username}")
    public ResponseEntity<Set<Cookbook>> getCookbooks(@PathVariable String username) {
    	try {
    		Set<Cookbook> cookbooks = recipeService.getCookbooksByUsername(username);
    		if (cookbooks == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		return new ResponseEntity<>(cookbooks, HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could not fetch cookbooks:");
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
    @GetMapping(path = "/recipes?creator={username}") 
    public ResponseEntity<Set<Recipe>> getRecipes(@PathVariable String username) {
    	try {
    		Set<Recipe> recipes = recipeService.getRecipesByUsername(username);
    		if (recipes == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		return new ResponseEntity<>(recipes, HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could fetch recipes:");
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	
    }
   
    
    @PostMapping(path = "/cookbook", consumes = "multipart/form-data")
    public ResponseEntity<String> createCookbook(@RequestParam("cookbookName") String cookbookName,
    											 @RequestParam("cookbookCategory") String cookbookCategory,
    											 @RequestParam("username") String username) {
    	try {
    		User u = (User) userService.loadUserByUsername(username);
    		if (u == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		Cookbook c = new Cookbook(cookbookName, cookbookCategory, u);
    		recipeService.addCookbook(c);
    		return new ResponseEntity<>(HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could not add cookbook: ");
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
    /*
    @GetMapping(path = "/products")
    public ResponseEntity<List<RecipeIngredients>> getIngredients()
    */
    

}
