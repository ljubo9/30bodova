package app.recipe;

import jakarta.persistence.*;

@Entity

public class Image {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

	@OneToOne
	private StepOfMaking stepOfMaking;

	@OneToOne
	private Ingredient ingredient;


	@Lob
	private byte[] imageData;

	public byte[] getImageData() {
		return imageData;
	}

	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}

	public Ingredient getIngredient() {
		return ingredient;
	}

	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}


    public Image(String name,byte[] imageData) {
		this.name=name;
		this.imageData=imageData;
    	
    }
	public Image() {
		// Optional: Initialize default values if needed
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


    // Constructors, getters, setters
}
