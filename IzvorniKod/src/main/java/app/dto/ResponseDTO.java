package app.dto;
import app.recipe.Response;
public class ResponseDTO {

    private int id;

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

    private String message;
    // Add other fields as needed

    // Constructors, getters, and setters

    public static ResponseDTO fromEntity(Response response) {
        ResponseDTO dto = new ResponseDTO();
        dto.setId(response.getId());
        dto.setMessage(response.getMessage());
        // Map other properties accordingly
        return dto;
    }
}
