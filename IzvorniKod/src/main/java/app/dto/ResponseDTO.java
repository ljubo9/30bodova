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
        dto.setId(response.getId());
        dto.setMessage(response.getMessage());
        dto.setReviewId(response.getReviewId());
        dto.setCreatorId(response.getCreator().getId());
        return dto;
    }
}
