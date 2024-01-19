package app.dto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import app.recipe.Recipe;
import app.recipe.StepOfMaking;

public class RecipeDTO {

    public int id;
    public String name;

    public List<StepOfMakingDTO> stepsOfMaking;
    public int portionSize;
    public int cookTime;
    public List<RecipeIngredientDTO> ingredients;
    public List<ImageDTO> images;
    public List<ReviewDTO> reviews;


    // Constructors, getters, and setters
   
    public Recipe toEntity() {


        Recipe recipe = new Recipe(this);


        // Convert RecipeIngredientDTO to RecipeIngredient entities


        return recipe;
    }
    
    
    
    public RecipeDTO(Recipe recipe) {
    	this.id = recipe.getId();
        this.name = recipe.getName();
        this.stepsOfMaking = new ArrayList<>();
        for (StepOfMaking s : recipe.getStepsOfMaking()) {
        	this.stepsOfMaking.add(new StepOfMakingDTO(s));
        }
        this.portionSize = recipe.getPortionSize();
        this.cookTime = recipe.getCookTime();

        // Convert RecipeIngredient entities to RecipeIngredientDTOs
        List<RecipeIngredientDTO> recipeIngredientDTOs = recipe.getIngredients().stream()
                .map(RecipeIngredientDTO::fromEntity)
                .collect(Collectors.toList());
        this.ingredients = recipeIngredientDTOs;
        
        List<ReviewDTO> reviewDTOs = recipe.getReviews().stream()
                .map(ReviewDTO::fromEntity)
                .collect(Collectors.toList());
        this.reviews = reviewDTOs;

    }

    public static RecipeDTO fromEntity(Recipe recipe) {
        
        // Convert Image entities to ImageDTOs
    	return new RecipeDTO(recipe);
    }
}
