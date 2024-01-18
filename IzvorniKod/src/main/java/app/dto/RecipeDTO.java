package app.dto;
import java.util.List;
import java.util.stream.Collectors;

import app.recipe.Recipe;
import app.recipe.RecipeIngredient;
import app.recipe.StepOfMaking;

public class RecipeDTO {

    public int id;
    public String name;
    public int portionSize;
    public int cookTime;


    public RecipeDTO(Recipe r) {
    	this.id = r.getId();
    	this.name = r.getName();
    	this.portionSize = r.getPortionSize();
    	this.cookTime = r.getCookTime();
    }


	public Recipe toEntity() {
		// TODO Auto-generated method stub
		return new Recipe(name, portionSize, cookTime);
	}
    
}
