package app.dto;
import app.recipe.Image;
public class ImageDTO {

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private int id;
    private String name;
    private byte[] data;

    // Constructors, getters, and setters
    public ImageDTO() {
        // Default constructor
    }

    public ImageDTO(byte[] data) {
        this.data = data;
    }


    public ImageDTO(Image image) {
		// TODO Auto-generated constructor stub
    	if (image != null) this.data = image.getImageData();
	}

	public Image toEntity() {
        Image image = new Image(this.getName(),this.getData());

        // Set other properties accordingly
        return image;
    }

    public static ImageDTO fromEntity(Image image) {
        ImageDTO dto = new ImageDTO();
        dto.setName(image.getName());
        dto.setData(image.getImageData());
        dto.setId(image.getId());
        // Map other properties accordingly
        return dto;
    }
}
