package app.recipe;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Ingredient {

	@Id
	@SequenceGenerator(
			name = "ingredient_sequence",
			sequenceName = "student_sequence",
			allocationSize = 1
	)
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "ingredient_sequence")
	@Column(columnDefinition = "serial", insertable = false)
	private int id;
	
	private String name;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Image image;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Category cat;
	
	@ManyToMany(cascade = CascadeType.ALL)
	private List<Label> labels;
	
	private int calories; // per 100 g
	private int carbs;
	private int protein;
	private int salt;
	private int saturatedFat;



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
		this.calories = calories;
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


	public int getId() {
		return id;
	}

	public Category getCat() {
		return cat;
	}

	public List<Label> getLabels() {
		return labels;
	}

	public int getCalories() {
		return calories;
	}

	public int getCarbs() {
		return carbs;
	}

	public int getProtein() {
		return protein;
	}

	public int getSalt() {
		return salt;
	}

	public int getSaturatedFat() {
		return saturatedFat;
	}
	
	
	
	



}
