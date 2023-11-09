package app.recipe;

import java.util.List;

import app.roles.User;
import jakarta.persistence.*;

@Entity
@Table(name="Recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recipeId;
    
    private String stepsOfMaking;
    private int portionSize;
    private int cookTime;
    @ManyToMany(mappedBy = "recipes")
    private List<Cookbook> cookbooks;
    @ManyToOne
    private User creator;
    @OneToMany(mappedBy = "reviewGivenTo", cascade = CascadeType.ALL)
    private List<Review> reviews;
    
    @OneToMany
    @JoinColumn(name = "recipe_id")
    private List<RecipeIngredients> ingredients;
    
    public Recipe(int id, List<RecipeIngredients> ingredients, String stepsOfMaking, int portionSize, int cookTime, List<Image> images) {
        this.recipeId = id;
        this.ingredients = ingredients;
        this.stepsOfMaking = stepsOfMaking;
        this.portionSize = portionSize;
        this.cookTime = cookTime;
/*
        this.images = images;
*/
    }


    public int getId() {
        return recipeId;
    }

    public void setId(int id) {
        this.recipeId = id;
    }

    public List<RecipeIngredients> getIngredientsAndQuantities() {
        return ingredients;
    }

    public void setIngredientsAndQuantities(List<RecipeIngredients> ingredientsAndQuantities) {
        this.ingredients = ingredientsAndQuantities;
    }

    public String getStepsOfMaking() {
        return stepsOfMaking;
    }

    public void setStepsOfMaking(String stepsOfMaking) {
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

   /* public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
*/
}
