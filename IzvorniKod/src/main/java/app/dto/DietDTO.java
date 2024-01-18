package app.dto;

import java.util.List;

import app.recipe.Diet;

public class DietDTO {
	
	public String name;
	public String description;
	public UserDTO creator;
	public List<IngredientDTO> allowedIngredients;
	
	public DietDTO(Diet d) {
		this.name = d.getName();
		this.description = d.getOpis();
		this.creator = new UserDTO(d.getCreator());
		/*
		 * treba dovrsiti i napraviti DietIngredient i DietIngredientDTO
		 * for (Ingredient i : d.g)
		 */
	}
	
}	
