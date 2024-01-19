package app.service;


import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import app.recipe.Category;
import app.recipe.ConsumedRecipe;
import app.recipe.Cookbook;
import app.recipe.Image;
import app.recipe.Ingredient;
import app.recipe.Label;
import app.recipe.Recipe;
import app.recipe.RecipeIngredient;
import app.repository.CategoryRepository;
import app.repository.ConsumedRecipeRepository;
import app.repository.CookbookRepository;
import app.repository.IngredientRepository;
import app.repository.LabelRepository;
import app.repository.RecipeRepository;
import app.repository.UserRepository;
import app.roles.Enthusiast;
import app.roles.Role;
import app.roles.User;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final CookbookRepository cookbookRepository;
    private final UserRepository userRepository;
    private final IngredientRepository ingredientRepository;
    private final ConsumedRecipeRepository consumedRecipeRepository;
    private final CategoryRepository categoryRepository;
    private final LabelRepository labelRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, CookbookRepository cookbookRepository, UserRepository userRepository,
    		IngredientRepository ingredientRepository, ConsumedRecipeRepository consumedRecipeRepository, CategoryRepository categoryRepository,
    		LabelRepository labelRepository) {
        this.recipeRepository = recipeRepository;
        this.cookbookRepository = cookbookRepository;
        this.userRepository = userRepository;
        this.ingredientRepository = ingredientRepository;
        this.consumedRecipeRepository  = consumedRecipeRepository;
        this.categoryRepository  = categoryRepository;
        this.labelRepository  = labelRepository;
        
    }

    public Recipe loadRecipeById(int recipeId) {
        Optional<Recipe> recipeOptional = recipeRepository.findRecipeById(recipeId);
        return recipeOptional.orElse(null);
    }

    public Recipe createRecipe(Recipe recipe) {
        // You might want to perform additional logic or validation here before saving
        return recipeRepository.save(recipe);
    }

    // Add additional methods for updating, deleting, and other recipe-related operations as needed

    // Example method to get all recipes
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // Example method for updating a recipe
    public Recipe updateRecipe(int recipeId, Recipe updatedRecipe) {
        // Check if the recipe with the given ID exists
        Optional<Recipe> existingRecipeOptional = recipeRepository.findRecipeById(recipeId);
        if (existingRecipeOptional.isPresent()) {
            // Perform any additional logic before saving the updated recipe, if needed
            return recipeRepository.save(updatedRecipe);
        } else {
            // Recipe with the given ID not found
            // You might want to throw an exception or handle this situation based on your requirements
            return null;
        }
    }
    
    public Set<Cookbook> getCookbooksByUsername(String username) {
    	Optional<User> u = userRepository.findUserByUsername(username);
    	if (u.isPresent()) {
    		return ((Enthusiast)u.get()).getCookbooks();
    	}
    	return null;
    }

	public Set<Recipe> getRecipesByUsername(String username) {
		Optional<User> u = userRepository.findUserByUsername(username);
        if (u.isEmpty()) return null;
        if (u.get().getRole().getName().equalsIgnoreCase(Role.ENTHUSIAST.getName())) return ((Enthusiast)u.get()).getRecipes();
        return null;
    }

	public Set<Recipe> getRecipesByCategory(Category category) {
		List<Recipe> recipes = recipeRepository.findAll();
		Set<Recipe> setRecipes = new HashSet<>();
		for (Recipe r : recipes) {
			if (r.getCategory().getName().equals(category.getName())) setRecipes.add(r);
		}
		return setRecipes;
	}
	
	public Set<Cookbook> getCookbooksByCategory(Category category) {
		List<Cookbook> cookbooks = cookbookRepository.findAll();
		Set<Cookbook> setCookbooks = new HashSet<>();
		for (Cookbook c : cookbooks) {
			if (c.getCategory().getName().equals(category.getName())) setCookbooks.add(c);
		}
		return setCookbooks;
	}

	public Cookbook getCookbookById(int id) {
		Optional<Cookbook> c = cookbookRepository.findById(id);
		return c.orElse(null);
	}
	
    // Example method for deleting a recipe
    public void deleteRecipe(int recipeId) {
        recipeRepository.deleteById(recipeId);
    }

	public void addCookbook(Cookbook c) {
		// TODO Auto-generated method stub
		cookbookRepository.save(c); 
	}

	public List<Ingredient> getAllIngredients() {
		// TODO Auto-generated method stub
		return ingredientRepository.findAll();
	}

	public Map<Integer, Integer> getCalorieStatisticsByUsername(String username) {
		Optional<User> u = userRepository.findUserByUsername(username);
		if (u.isEmpty()) return null;
		User user = u.get();
		List<ConsumedRecipe> consumedRecipes = user.getConsumedRecipes();
		Map<Integer, Integer> mapa = new HashMap<>();

		for (ConsumedRecipe r: consumedRecipes) {
			Date d = r.getDate();
			Calendar today = Calendar.getInstance();
			Date now = today.getTime();
			long differenceMS = now.getTime() - d.getTime();
			long days = (long)(differenceMS / 1000f / 3600f / 24f); 
			if (days <= 7) {
				for (RecipeIngredient i : r.getRecipe().getIngredients()) {
					int cal = (int) ((i.getQuantity() / 100f) * i.getIngredient().getCalories());
					if (mapa.containsKey((int)days)) {
						mapa.put((int)days, mapa.get((int)days) + cal);
					}
					else {
						mapa.put((int)days, cal);
					}
				}
			}
			
	

		}
		return mapa;
	}

	public void addConsumedRecipe(int recipeId, String username, Date date) {
		// TODO Auto-generated method stub
		Optional<User> u = userRepository.findUserByUsername(username);
		if (u.isEmpty()) return;
		User user = u.get();
		Optional<Recipe> r = recipeRepository.findById(recipeId);
		if (r.isEmpty()) return;
		ConsumedRecipe recipe = new ConsumedRecipe(r.get(), user, date);
		List<ConsumedRecipe> consumedRecipes = user.getConsumedRecipes();
		consumedRecipes.add(recipe);
		user.setConsumedRecipes(consumedRecipes);
		consumedRecipeRepository.save(recipe);
		userRepository.save(user);
		
	}

	public Category findCategoryByName(String name) {
		// TODO Auto-generated method stub
		Optional<Category> cat = categoryRepository.findByName(name);
		return cat.orElse(null);
	}

	public void addCategory(Category cat) {
		// TODO Auto-generated method stub
		categoryRepository.save(cat);
	}

	public void addIngredient(String name, String category, int calories, int protein, int carbs, int fat, int sugar,
			int salt, int saturatedFat, Optional<MultipartFile> img, int weight, List<String> labels) {
		// TODO Auto-generated method stub
		if (ingredientRepository.findByName(name).isPresent()) return;
		Category cat = getOrAddCategory(category);
		List<Label> label = getOrAddLabels(labels);
		try {
			Image image = img.isPresent() ? new Image(img.get().getName() ,img.get().getBytes()) : null;
			Ingredient ing = new Ingredient(name, cat, calories, protein, carbs, salt, saturatedFat,
					image, weight, label);
			ingredientRepository.save(ing);
		}
		catch(Exception e) {
			e.printStackTrace();
			throw new IllegalStateException("Could not add ingredient");
		}
		
		
		
	}
	
	private List<Label> getOrAddLabels(List<String> labels) {
		// TODO Auto-generated method stub
		List<Label> finalList = new ArrayList<>();
		for (String l : labels) {
			Optional<Label> labelO = labelRepository.findByName(l);
			Label lab;
			if(labelO.isEmpty()) {
				lab = new Label(l);
				labelRepository.save(lab);
			}
			else {
				lab = labelO.get();
			}
			finalList.add(lab);
		}
		return finalList;
	}

	public Category getOrAddCategory(String category) {
		Optional<Category> catO = categoryRepository.findByName(category);
		Category cat;
		if(catO.isEmpty()) {
			cat = new Category(category);
			categoryRepository.save(cat);
		}
		else {
			cat = catO.get();
		}
		return cat;
	}

	public List<Cookbook> getCookbookByUsername(int id) {
		// TODO Auto-generated method stub
		Optional<List<Cookbook>> cb = cookbookRepository.findByCreatorId(id);
		return cb.orElse(null);
	}
	
	

}


