package app.dto;
import app.recipe.Ingredient;
import app.recipe.Recipe;
import app.recipe.RecipeIngredient;
public class RecipeIngredientDTO {

    public IngredientDTO ingredient;
    public int quantity;
    public int recipeId;


    public RecipeIngredientDTO() {
        // Default constructor
    }

    public RecipeIngredientDTO(Ingredient ingredient, int quantity, Recipe r) {
        this.ingredient = new IngredientDTO(ingredient);
        this.quantity = quantity;
        this.recipeId = r.getId();
    }

    public RecipeIngredientDTO(RecipeIngredient r) {
    	this.ingredient = new IngredientDTO(r.getIngredient());
    }

    
    public RecipeIngredient toEntity() {
        RecipeIngredient recipeIngredient = new RecipeIngredient(this);

        // Set other properties accordingly
        return recipeIngredient;
    }
    

    public static RecipeIngredientDTO fromEntity(RecipeIngredient recipeIngredient) {
        RecipeIngredientDTO dto = new RecipeIngredientDTO();
        return new RecipeIngredientDTO(recipeIngredient);
    }
}