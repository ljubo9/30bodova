package app.dto;

import app.recipe.StepOfMaking;

public class StepOfMakingDTO {
	public int id;
	public int stepNum;
	public String description;
	public int recipeid;
	public int imageid;
	
	public StepOfMakingDTO(StepOfMaking step) {
		this.id = step.getId();
		this.stepNum = step.getStepNum();
		this.description = step.getDescription();
		if (step.getRecipe() != null) this.recipeid = step.getRecipe().getId();
		if (step.getImage() != null) this.imageid = step.getImage().getId();
	}
}
