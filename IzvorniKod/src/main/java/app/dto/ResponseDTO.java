package app.dto;
import app.recipe.Response;
public class ResponseDTO {

    public int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String message;

    public int review_id;
    public int creator_id;

    public int getCreatorId(){
        return creator_id;
    }

    public void setCreatorId(int creator_id){
        this.creator_id = creator_id;
    }

    public int getReviewId() { return review_id;}
    public void setReviewId(int review_id){this.review_id = review_id;}
    public static ResponseDTO fromEntity(Response response) {
        ResponseDTO dto = new ResponseDTO();
        dto.setId(response.getId());
        dto.setMessage(response.getMessage());
        dto.setReviewId(response.getReviewId());
        dto.setCreatorId(response.getCreator().getId());
        return dto;
    }
}
