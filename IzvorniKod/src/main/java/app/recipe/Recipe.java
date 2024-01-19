package app.recipe;

import java.util.List;

import app.dto.RecipeDTO;
import app.roles.User;
import jakarta.persistence.*;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany
    private List<StepOfMaking> stepsOfMaking;
    
    private int portionSize;
    private int cookTime;
    @ManyToMany(mappedBy = "recipes")
    private List<Cookbook> cookbooks;

    @ManyToMany

    @JoinTable(
            name = "recipe_diet",
            joinColumns = @JoinColumn(name = "diet_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"diet_id", "recipe_id"}))
    private List<Diet> diets;
    
    @ManyToOne
    private User creator;
    
    @OneToMany(mappedBy = "reviewGivenTo", cascade = CascadeType.ALL)
    private List<Review> reviews;
    
    @OneToMany
    @JoinColumn(name = "recipe_id")
    private List<RecipeIngredient> ingredients;

    private String category;

    public Recipe( int id,String name, List<RecipeIngredient> ingredients,List<StepOfMaking> stepsOfMaking, int portionSize, int cookTime) {
        this.id=id;
        this.name = name;
        this.ingredients = ingredients;
        this.stepsOfMaking = stepsOfMaking;
        this.portionSize = portionSize;
        this.cookTime = cookTime;

    }
    public Recipe( String name, List<RecipeIngredient> ingredients,List<StepOfMaking> stepsOfMaking, int portionSize, int cookTime) {

        this.name = name;
        this.ingredients = ingredients;
        this.stepsOfMaking = stepsOfMaking;
        this.portionSize = portionSize;
        this.cookTime = cookTime;

    }
    public Recipe( String name,int portionSize, int cookTime,User creator) {

        this.name = name;

        this.portionSize = portionSize;
        this.cookTime = cookTime;
        this.creator=creator;
    }

    public Recipe() {
    	
    }

    public Recipe(String name2, int portionSize2, int cookTime2) {
		// TODO Auto-generated constructor stub
    	this.name = name2;
    	this.portionSize = portionSize2;
    	this.cookTime = cookTime2;
	}
	public Recipe(RecipeDTO recipeDTO) {
		// TODO Auto-generated constructor stub
		/** needs to be implemented **/
	}
	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<RecipeIngredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<RecipeIngredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<StepOfMaking> getStepsOfMaking() {
        return stepsOfMaking;
    }

    public void setStepsOfMaking(List<StepOfMaking> stepsOfMaking) {
        this.stepsOfMaking = stepsOfMaking;
    }

    public int getPortionSize() {
        return portionSize;
    }

    public void setPortionSize(int portionSize) {
        this.portionSize = portionSize;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}
	
	public String getCategory() {
		return this.category;
	}
    
    

}
