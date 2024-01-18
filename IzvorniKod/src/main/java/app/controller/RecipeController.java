package app.controller;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import app.recipe.*;
import app.service.RecipeService;
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

import app.dto.CookbookDTO;
import app.dto.IngredientDTO;
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
    
    @GetMapping(path = "/cookbooks")
    public ResponseEntity<Set<CookbookDTO>> getCookbooks(@RequestParam String creator) {
    	try {
    		Set<Cookbook> cookbooks = recipeService.getCookbooksByUsername(creator);
    		if (cookbooks == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		Set<CookbookDTO> cookbookdto = new HashSet<>();
    		for (Cookbook c : cookbooks) {
    			cookbookdto.add(new CookbookDTO(c));
    		}
    		return new ResponseEntity<>(cookbookdto, HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could not fetch cookbooks:");
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
    @GetMapping(path = "/cookbooks/category")
    public ResponseEntity<Set<CookbookDTO>> getCookbooksByCategory(@RequestParam String category) {
    	try {
    		Set<Cookbook> cookbooks = recipeService.getCookbooksByCategory(category);
    		if (cookbooks == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		Set<CookbookDTO> cookbookdto = new HashSet<>();
    		for (Cookbook c : cookbooks) {
    			cookbookdto.add(new CookbookDTO(c));
    		}
    		return new ResponseEntity<>(cookbookdto, HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could not fetch cookbooks:");
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
    @GetMapping(path = "/recipes") 
    public ResponseEntity<Set<RecipeDTO>> getRecipes(@RequestParam String creator) {
    	try {
    		Set<Recipe> recipes = recipeService.getRecipesByUsername(creator);
    		if (recipes == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		Set<RecipeDTO> recipedto = new HashSet<>();
    		for (Recipe c : recipes) {
    			recipedto.add(RecipeDTO.fromEntity(c));
    		}
    		return new ResponseEntity<>(recipedto, HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could fetch recipes:");
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	
    }
    
    @GetMapping(path = "/recipes/category") 
    public ResponseEntity<Set<RecipeDTO>> getRecipesByCategory(@RequestParam String category) {
    	try {
    		Set<Recipe> recipes = recipeService.getRecipesByCategory(category);
    		if (recipes == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		Set<RecipeDTO> recipedto = new HashSet<>();

    		for (Recipe c : recipes) {
    			recipedto.add(RecipeDTO.fromEntity(c));
    		}
    		return new ResponseEntity<>(recipedto, HttpStatus.OK);
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
    
    @GetMapping(path = "/cookbook/{id}")
    public ResponseEntity<CookbookDTO> getCookbook(@PathVariable int id) {
    	try {
    		Cookbook c = recipeService.getCookbookById(id);
    		if (c == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		return new ResponseEntity<>(new CookbookDTO(c), HttpStatus.OK);
    	}
    	catch(Exception e) {
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
    /*
    @GetMapping(path = "/products")
    public ResponseEntity<List<RecipeIngredients>> getIngredients()
    */
    
    @GetMapping(path = "/latest-enthusiast-recipes")
    public ResponseEntity<Map<String, Set<RecipeDTO>>> getLatestRecipes() {
		try {
			Map<String, Set<RecipeDTO>> list = new HashMap<>();
			List<User> enthusiasts = userService.loadAllEnthusiasts();
			
			for (User en : enthusiasts) {
				Set<Recipe> recipes = getNLatestRecipes(en, 3);
				Set<RecipeDTO> recipedto = new HashSet<>();
	    		for (Recipe c : recipes) {
	    			recipedto.add(RecipeDTO.fromEntity(c));
	    		}
				list.put(en.getUsername(), recipedto);
			}
			
			return new ResponseEntity<>(list, HttpStatus.OK);
		}
		catch(Exception e) {
			System.out.println("Cannot fetch lates recipes: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	private Set<Recipe> getNLatestRecipes(User en, int i) {
		// TODO Auto-generated method stub
		Set<Recipe> allRecipe = en.getRecipes();
		Set<Recipe> finalRecipe = new HashSet<>();
		if (allRecipe.size() <= 3) return allRecipe;
		/** sort recipes by date**/
		Recipe[] recipes = (Recipe[]) allRecipe.toArray();
		finalRecipe.add(recipes[0]);
		finalRecipe.add(recipes[1]);
		finalRecipe.add(recipes[2]);
		return finalRecipe;
	}
	
	@GetMapping(path = "/latest-enthusiast/cookbooks")
    public ResponseEntity<Map<String, Set<CookbookDTO>>> getLatestCookbooks() {
		try {
			Map<String, Set<CookbookDTO>> list = new HashMap<>();
			List<User> enthusiasts = userService.loadAllEnthusiasts();
			
			for (User en : enthusiasts) {
				Set<Cookbook> cookbooks = getNLatestCookbooks(en, 3);
				Set<CookbookDTO> cookbookdto = new HashSet<>();
	    		for (Cookbook c : cookbooks) {
	    			cookbookdto.add(new CookbookDTO(c));
	    		}
				list.put(en.getUsername(), cookbookdto);
			}
			
			return new ResponseEntity<>(list, HttpStatus.OK);
		}
		catch(Exception e) {
			System.out.println("Cannot fetch lates cookbooks: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	private Set<Cookbook> getNLatestCookbooks(User en, int i) {
		// TODO Auto-generated method stub
		Set<Cookbook> allCookbooks = en.getCookbooks();
		Set<Cookbook> finalCookbooks = new HashSet<>();
		if (allCookbooks.size() <= 3) return allCookbooks;
		/** sort recipes by date**/
		Cookbook[] cookbooks = (Cookbook[]) allCookbooks.toArray();
		finalCookbooks.add(cookbooks[0]);
		finalCookbooks.add(cookbooks[1]);
		finalCookbooks.add(cookbooks[2]);
		return finalCookbooks;
	}
	
	@GetMapping(path = "/recipes/user/{username}")
	public ResponseEntity<Set<Recipe>> getConsumedRecipes(@PathVariable String username) {
		try {
			User u = (User)userService.loadUserByUsername(username);
			if (u == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			List<ConsumedRecipe> consumed = u.getConsumedRecipes();
			Set<Recipe> recipes = new HashSet<>();
			for (ConsumedRecipe r : consumed) {
				recipes.add(r.getRecipe());
			}
			return new ResponseEntity<>(recipes, HttpStatus.OK);
		}
		catch (Exception e) {
			System.out.println("Could not fetch user's consumed recipes: ");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping(path = "/recipes/all")
	public ResponseEntity<Set<RecipeDTO>> getAllRecipes() {
		try {
			List<Recipe> recipes = recipeService.getAllRecipes();
			HashSet<RecipeDTO> recipesDTO = new HashSet<>();
			for (Recipe r : recipes) {
				recipesDTO.add(RecipeDTO.fromEntity(r));
			}
			
			return new ResponseEntity<>(recipesDTO, HttpStatus.OK);
	
		}
		catch (Exception e){
			System.out.println("Could not fetch all recipes:");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(path = "/ingredients/all")
	public ResponseEntity<Set<IngredientDTO>> getAllIngredients() {
		try {
			List<Ingredient> ingredients = recipeService.getAllIngredients();
			HashSet<IngredientDTO> ingredientsDTO = new HashSet<>();
			for (Ingredient i : ingredients) {
				ingredientsDTO.add(new IngredientDTO(i));
			}
			
			return new ResponseEntity<>(ingredientsDTO, HttpStatus.OK);
		}
		catch (Exception e) {
			System.out.println("Could not fetch all ingredients:");
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
