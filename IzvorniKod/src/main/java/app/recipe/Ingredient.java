package app.recipe;

import jakarta.persistence.*;

@Entity
public class Ingredient {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	@OneToOne
	private Image image;

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}


	public Ingredient(String name /*, qrcode implementation */) {
		this.name = name;	
	}

	public Ingredient() {
		
	}
	public int getIngredientId() {
		return id;
	}

	public String getName() {
		return name;
	}
	
	
	
}
