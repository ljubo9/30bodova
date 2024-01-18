package app.service;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.recipe.Cookbook;
import app.recipe.Ingredient;
import app.recipe.Recipe;
import app.repository.CookbookRepository;
import app.repository.IngredientRepository;
import app.repository.RecipeRepository;
import app.roles.Enthusiast;
import app.roles.User;
import app.roles.UserRepository;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final CookbookRepository cookbookRepository;
    private final UserRepository userRepository;
    private final IngredientRepository ingredientRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, CookbookRepository cookbookRepository, UserRepository userRepository,
    		IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.cookbookRepository = cookbookRepository;
        this.userRepository = userRepository;
        this.ingredientRepository = ingredientRepository;
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
        return ((Enthusiast)u.get()).getRecipes();
    }

	public Set<Recipe> getRecipesByCategory(String category) {
		List<Recipe> recipes = recipeRepository.findAll();
		Set<Recipe> setRecipes = new HashSet<>();
		for (Recipe r : recipes) {
			if (r.getCategory().equals(category)) setRecipes.add(r);
		}
		return setRecipes;
	}
	
	public Set<Cookbook> getCookbooksByCategory(String category) {
		List<Cookbook> cookbooks = cookbookRepository.findAll();
		Set<Cookbook> setCookbooks = new HashSet<>();
		for (Cookbook c : cookbooks) {
			if (c.getCategory().equals(category)) setCookbooks.add(c);
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


}


