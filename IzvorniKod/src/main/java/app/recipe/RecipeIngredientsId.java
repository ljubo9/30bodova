package app.recipe;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class RecipeIngredientsId {
	@Column(name = "recipe_id")
	private int recipeId;
	
	@Column(name = "ingredient_id")
	private int ingredientId;
}
	