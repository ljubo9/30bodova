package app.dto;

public class RecipeDTO {
	public int id;
	public String name;
	public String stepsOfMaking;
	public int portionSize;
	public int cookTime;
	
	public RecipeDTO(int id, String name, String stepsOfMaking, int portionSize, int cookTime) {
		super();
		this.id = id;
		this.name = name;
		this.stepsOfMaking = stepsOfMaking;
		this.portionSize = portionSize;
		this.cookTime = cookTime;
	}
	
	
}
