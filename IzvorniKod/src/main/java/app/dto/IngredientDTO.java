package app.dto;

import app.recipe.Ingredient;

public class IngredientDTO {

	public int id;
	public String name;
	public int imageid;
	
	public IngredientDTO(Ingredient i) {
		this.id = i.getIngredientId();
		this.name = i.getName();
		if (i.getImage() != null) this.imageid = i.getImage().getId();
	}
}
