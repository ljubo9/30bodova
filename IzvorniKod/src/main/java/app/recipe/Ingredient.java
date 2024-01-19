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
	
	private Category cat;
	
	List<Label> labels;
	
	private int calories;
	private int carbs;
	private int protein;
	private int salt;
	private int saturatedFat;

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
	public Ingredient(String name2, Category cat, int calories, int protein, int carbs, int salt, int saturatedFat,
			Image image2, int weight, List<Label> label) {
		// TODO Auto-generated constructor stub
		this.name = name2;
		this.cat = cat;
		this.carbs = (int) (carbs * ((float)weight / 100));
		this.salt = (int) (salt * ((float)weight / 100));
		this.saturatedFat = (int) (saturatedFat * ((float)weight / 100));
		if (image2 != null) this.image = image2;
		this.labels = label;
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

	public int getId() {
		return id;
	}

	public Category getCat() {
		return cat;
	}
	
	



}
