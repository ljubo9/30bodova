package app.dto;
import app.recipe.*;
public class ImageDTO {

    private String url;

    // Constructors, getters, and setters
    public ImageDTO() {
        // Default constructor
    }

    public ImageDTO(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    public Image toEntity() {
        Image image = new Image();
        image.setImageUrl(this.url);
        // Set other properties accordingly
        return image;
    }

    public static ImageDTO fromEntity(Image image) {
        ImageDTO dto = new ImageDTO();
        dto.setUrl(image.getImageUrl());
        // Map other properties accordingly
        return dto;
    }
}
