package app.dto;

import app.recipe.Review;

public class ReviewDTO {

	public String username;
	public int mark;
	public String message;
	public ResponseDTO response;
	
	public ReviewDTO(Review r) {
		if (r.getCreator() != null) {
			this.username = r.getCreator().getUsername();
		}
		else {
			this.username = null;
		}
		this.mark = r.getMark();
		this.message = r.getMessage();
		if (r.getResponse() != null) this.response = new ResponseDTO(r.getResponse());
	}
	
	public static ReviewDTO fromEntity(Review r) {
		return new ReviewDTO(r);
	}
}

