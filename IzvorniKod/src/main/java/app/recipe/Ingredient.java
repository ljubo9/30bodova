package app.recipe;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Ingredient {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	@OneToOne
	private Image image;


	@OneToMany
	private List<DietIngredient> dietIngredients;

	public List<DietIngredient> getDietIngredients() {
		return dietIngredients;
	}

	public void setDietIngredients(List<DietIngredient> dietIngredients) {
		this.dietIngredients = dietIngredients;
	}

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
