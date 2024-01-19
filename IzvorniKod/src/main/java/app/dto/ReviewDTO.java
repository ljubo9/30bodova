package app.dto;

import app.recipe.Review;

public class ReviewDTO {

	public String username;
	public int creator_id;
	public int mark;
	public String message;
	public ResponseDTO response;
	
	public ReviewDTO(Review r) {
		this.username = r.getCreator().getUsername();
		this.creator_id = r.getCreator().getId();
		this.mark = r.getMark();
		this.message = r.getMessage();
		if (r.getResponse() != null) this.response = new ResponseDTO(r.getResponse());
	}
	
	public static ReviewDTO fromEntity(Review r) {
		return new ReviewDTO(r);
	}
}

