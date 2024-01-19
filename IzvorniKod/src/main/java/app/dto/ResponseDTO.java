package app.dto;
import app.recipe.Response;
public class ResponseDTO {

    public int id;

    public String message;
    public int reviewId;
    
    public ResponseDTO(Response r) {
    	this.id = r.getId();
    	this.message = r.getMessage();
    	this.reviewId = r.getReviewId();
    }
    
    public ResponseDTO() { 
    	
    }
    
    
    // Add other fields as needed

    // Constructors, getters, and setters

    public static ResponseDTO fromEntity(Response response) {
        ResponseDTO dto = new ResponseDTO();
        dto.id = response.getId();
        dto.message = response.getMessage();
        dto.reviewId = response.getReviewId();
        return dto;
    }
}
