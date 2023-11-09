package app.recipe;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipe_ingredients")
public class RecipeIngredients {
	
	@Id
	@ManyToOne
	private Ingredient ingredient;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;
	private int quantity;
	
	public RecipeIngredients(Ingredient ingredient, Recipe recipe, int quantity) {
		this.ingredient = ingredient;
		this.recipe = recipe;
		this.quantity = quantity;
	}


	public Ingredient getIngredient() {
		return ingredient;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public int getQuantity() {
		return quantity;
	}
	
	
}
