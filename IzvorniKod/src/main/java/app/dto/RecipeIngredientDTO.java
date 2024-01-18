package app.dto;
import app.recipe.Ingredient;
import app.recipe.Recipe;
import app.recipe.RecipeIngredient;
public class RecipeIngredientDTO {

    private Ingredient ingredient;
    private int quantity;

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    private Recipe recipe;

    public RecipeIngredientDTO() {
        // Default constructor
    }

    public RecipeIngredientDTO(Ingredient ingredient,Recipe recipe, int quantity) {
        this.ingredient = ingredient;
        this.recipe=recipe;
        this.quantity = quantity;
    }

    public Ingredient getIngredient() {
        return this.ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public RecipeIngredient toEntity() {
        RecipeIngredient recipeIngredient = new RecipeIngredient(this.ingredient,this.recipe,this.quantity);

        // Set other properties accordingly
        return recipeIngredient;
    }

    public static RecipeIngredientDTO fromEntity(RecipeIngredient recipeIngredient) {
        RecipeIngredientDTO dto = new RecipeIngredientDTO();
        dto.setIngredient(recipeIngredient.getIngredient());
        dto.setRecipe(recipeIngredient.getRecipe());
        dto.setQuantity(recipeIngredient.getQuantity());
        // Map other properties accordingly
        return dto;
    }
}