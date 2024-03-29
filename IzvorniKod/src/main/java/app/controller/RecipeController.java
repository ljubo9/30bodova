package app.controller;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import app.dto.CategoryDTO;
import app.dto.CookbookDTO;
import app.dto.IngredientDTO;
import app.dto.RecipeDTO;
import app.dto.UserDTO;
import app.recipe.Category;
import app.recipe.ConsumedRecipe;
import app.recipe.Cookbook;
import app.recipe.Image;
import app.recipe.Ingredient;
import app.recipe.Recipe;
import app.recipe.StepOfMaking;
import app.roles.Enthusiast;
import app.roles.User;
import app.service.RecipeService;
import app.service.UserService;

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


    @GetMapping("/recipe/get/{id}")
    public ResponseEntity<RecipeDTO> getRecipeById(@PathVariable int id) {
        try {
            // Fetch the recipe by ID
            Recipe recipe = recipeService.loadRecipeById(id);

            if (recipe != null) {
                // Convert the Recipe entity to a RecipeDTO
                RecipeDTO recipeDTO = new RecipeDTO(recipe);
                return new ResponseEntity<>(recipeDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/recipe", consumes = "multipart/form-data")
    public ResponseEntity<RecipeDTO> createRecipe(@RequestParam("username") String username,
    		@RequestParam("categoryName") String category,
    		@RequestParam("cookTime") int cookTime,
    		@RequestParam("portionSize") int portionSize,
    		@RequestParam("name") String name
    		) {
        try {
        	Category c = recipeService.findCategoryByName(category);
        	CategoryDTO cDTO ;
        	if (c != null ) cDTO = new CategoryDTO(c);
        	else {
        		Category sc = new Category(category);
        		recipeService.addCategory(sc);
        		cDTO = new CategoryDTO(recipeService.findCategoryByName(category));
        	}
        	User u = userService.loadUserByUsername(username);
            Recipe newRecipe = new Recipe(name, portionSize, cookTime, u, c);
            recipeService.addRecipe(newRecipe);
            RecipeDTO createdRecipeDTO = new RecipeDTO(newRecipe);
            return new ResponseEntity<>(createdRecipeDTO, HttpStatus.CREATED);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping(path = "/cookbook/{creator}")
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
    public ResponseEntity<Set<CookbookDTO>> getCookbooksByCategory(@RequestParam Category category) {
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
    			recipedto.add(new RecipeDTO(c));
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
    public ResponseEntity<Set<RecipeDTO>> getRecipesByCategory(@RequestParam Category category) {
    	try {
    		Set<Recipe> recipes = recipeService.getRecipesByCategory(category);
    		if (recipes == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		Set<RecipeDTO> recipedto = new HashSet<>();

    		for (Recipe c : recipes) {
    			recipedto.add(new RecipeDTO(c));
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
    		Category cat = recipeService.findCategoryByName(cookbookCategory);
    		if (cat == null) {
    			cat = new Category(cookbookCategory);
    			recipeService.addCategory(cat);
    		}
    		Cookbook c = new Cookbook(cookbookName, cat, u);
    		recipeService.addCookbook(c);
    		return new ResponseEntity<>(HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could not add cookbook: ");
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
    @GetMapping(path = "/cookbook/get/{id}")
    public ResponseEntity<List<CookbookDTO>> getCookbook(@PathVariable int id) {
    	try {
    		List<Cookbook> cb = recipeService.getCookbookByUsername(id);
    		if (cb == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		List<CookbookDTO> list = new ArrayList<>();
    		for (Cookbook c : cb) {
    			list.add(new CookbookDTO(c));
    		}
    		return new ResponseEntity<>(list, HttpStatus.OK);
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
			List<Enthusiast> enthusiasts = userService.loadAllEnthusiasts();
			
			for (User en : enthusiasts) {
				List<Recipe> recipes = getNLatestRecipes((Enthusiast)en, 3);
				Set<RecipeDTO> recipedto = new HashSet<>();
	    		for (Recipe c : recipes) {
	    			recipedto.add(new RecipeDTO(c));
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


	private List<Recipe> getNLatestRecipes(Enthusiast en, int i) {
		// TODO Auto-generated method stub
		List<Recipe> allRecipe = new ArrayList<>(en.getRecipes());
		List<Recipe> finalRecipe = new ArrayList<>();
		if (allRecipe.size() <= 3) return allRecipe;
		/** sort recipes by date**/
		finalRecipe.add(allRecipe.get(0));
		finalRecipe.add(allRecipe.get(1));
		finalRecipe.add(allRecipe.get(2));
		return finalRecipe;
	}
	
	@GetMapping(path = "/latest-enthusiast-cookbooks")
    public ResponseEntity<Map<String, Set<CookbookDTO>>> getLatestCookbooks() {
		try {
			Map<String, Set<CookbookDTO>> list = new HashMap<>();
			List<Enthusiast> enthusiasts = userService.loadAllEnthusiasts();
			
			for (User en : enthusiasts) {
				Set<Cookbook> cookbooks = getNLatestCookbooks((Enthusiast)en, 3);
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


	private Set<Cookbook> getNLatestCookbooks(Enthusiast en, int i) {
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
	public ResponseEntity<Set<RecipeDTO>> getConsumedRecipes(@PathVariable String username) {
		try {
			User u = (User)userService.loadUserByUsername(username);
			if (u == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			List<ConsumedRecipe> consumed = u.getConsumedRecipes();
			Set<RecipeDTO> recipes = new HashSet<>();
			for (ConsumedRecipe r : consumed) {
				recipes.add(new RecipeDTO(r.getRecipe()));
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
				recipesDTO.add(new RecipeDTO(r));
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
	
	
	@GetMapping(path = "/statistic/user/{username}")
	public ResponseEntity<Map<Integer, Integer>> getCalorieStatistics(@PathVariable String username) {
		try {
			Map<Integer, Integer> mapa = recipeService.getCalorieStatisticsByUsername(username);
			if (mapa == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
			return new ResponseEntity<>(mapa, HttpStatus.OK);
		}
		catch (Exception e) {
			System.out.println("Could not fetch consumed recipes: ");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(path = "/recipes/addToTriedRecipes")
	public ResponseEntity<String> addConsumedRecipe(@RequestParam("recipeId") int recipeId, @RequestParam("username") String username, @RequestParam("date") Date date) {
		try {
			recipeService.addConsumedRecipe(recipeId, username, date);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping(path ="/ingredients/add")
	public ResponseEntity<String> addNewIngredient(@RequestParam("name") String name,
			@RequestParam("category") String category,
			@RequestParam("calories") int calories,
			@RequestParam("protein") int protein,
			@RequestParam("carbs") int carbs,
			@RequestParam("fat") int fat,
			@RequestParam("sugar") int sugar,
			@RequestParam("salt") int salt,
			@RequestParam("saturatedFat") int saturatedFat,
			@RequestParam("image") Optional<MultipartFile> img,
			@RequestParam("weight") int weight,
			@RequestParam("labels") List<String> labels) {
		try {
			recipeService.addIngredient(name,
					category,
					calories,
					protein,
					carbs,
					fat,
					sugar,
					salt,
					saturatedFat,
					img,
					weight,
					labels);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e) {
			System.out.println("Could not add ingredient");
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(path = "/RecipeIngredient")
	public ResponseEntity<String> addRecipeIngredient(@RequestParam("recipeId") int recipeId, 
			@RequestParam("ingredientName") String name, @RequestParam("ingredientQuantity") int ingredientQuantity) {
		try {
			recipeService.addRecipeIngredient(recipeId, name, ingredientQuantity);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
		}
	}
	
	@PostMapping(path = "/StepOfMaking")
	public ResponseEntity<String> addStepOfMaking(@RequestParam("recipeId") int recipeId, 
			@RequestParam("stepNumber") int num, @RequestParam("stepDescription") String description, @RequestParam("stepImage") Optional<MultipartFile> image) {
		try {
			Recipe r = recipeService.loadRecipeById(recipeId);
			Image img = null;
			if (image.isPresent()) img = new Image(image.get().getName(), image.get().getBytes());
			StepOfMaking stm = new StepOfMaking(r, num, description, img);
			recipeService.addStepOfMaking(stm);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


}
