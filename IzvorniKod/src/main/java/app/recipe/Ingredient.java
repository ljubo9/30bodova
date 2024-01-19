package app.recipe;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Ingredient {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;
	@ManyToOne

	private Image image;

	private int energy; //kcal per 100g


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

	public int getEnergy() {
		return energy;
	}



}
