package app.recipe;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
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
    public List<Recipe> getRecipes() {
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

}


