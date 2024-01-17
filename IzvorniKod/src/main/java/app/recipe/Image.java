package app.recipe;

import jakarta.persistence.*;

@Entity
public class Image {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String imageUrl;
	@OneToOne
	private StepOfMaking stepOfMaking;

	public Ingredient getIngredient() {
		return ingredient;
	}

	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}

	@OneToOne
	private Ingredient ingredient;
    
    
    public Image(String name, String imageUrl) {
    	this.imageUrl = imageUrl;
    }
    
    public Image() {
    	
    }
    

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
    
    
    // Constructors, getters, setters
}
