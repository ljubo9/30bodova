package app.recipe;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ingredient {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	public Ingredient(String name /*, qrcode implementation */) {
		this.name = name;	
	}

	public int getIngredientId() {
		return id;
	}

	public String getName() {
		return name;
	}
	
	
	
}
