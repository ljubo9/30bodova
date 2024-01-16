package app.dto;

import app.recipe.Recipe;
import app.recipe.Review;
import app.roles.User;

public class ReviewDTO {
	
	private int id;
    private int mark;
    private String message;

    public ReviewDTO(Review r) {
    	this.id = r.getId();
    	this.mark = r.getMark();
    	this.message = r.getMessage();
    }

	public int getId() {
		return id;
	}

	public int getMark() {
		return mark;
	}

	public String getMessage() {
		return message;
	}
    
    
}
