package app.recipe;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipe_ingredient")
public class RecipeIngredient {
	
	@Id
	@ManyToOne
	@JoinColumn(name = "ingredient_id")
	private Ingredient ingredient;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;
	
	private int quantity;
	
	public RecipeIngredient(Ingredient ingredient, Recipe recipe, int quantity) {
		this.ingredient = ingredient;
		this.recipe = recipe;
		this.quantity = quantity;
	}

	public RecipeIngredient() {
		
	}
	
	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
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


	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
