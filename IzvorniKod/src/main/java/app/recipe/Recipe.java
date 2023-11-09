package app.recipe;

import app.roles.User;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name="Recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String ingredientsAndQuantities;
    private String stepsOfMaking;
    private String portionSize;
    private String cookTime;
    @OneToMany(mappedBy = "recipe")
    private Set<Image> images;
   /* @ManyToMany(mappedBy = "recipes")
    private List<Cookbook> cookbooks;*/
    @ManyToOne
    private User creator;
    public Recipe(int id, String ingredientsAndQuantities, String stepsOfMaking, String portionSize, String cookTime, List<Image> images) {
        this.id = id;
        this.ingredientsAndQuantities = ingredientsAndQuantities;
        this.stepsOfMaking = stepsOfMaking;
        this.portionSize = portionSize;
        this.cookTime = cookTime;
/*
        this.images = images;
*/
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIngredientsAndQuantities() {
        return ingredientsAndQuantities;
    }

    public void setIngredientsAndQuantities(String ingredientsAndQuantities) {
        this.ingredientsAndQuantities = ingredientsAndQuantities;
    }

    public String getStepsOfMaking() {
        return stepsOfMaking;
    }

    public void setStepsOfMaking(String stepsOfMaking) {
        this.stepsOfMaking = stepsOfMaking;
    }

    public String getPortionSize() {
        return portionSize;
    }

    public void setPortionSize(String portionSize) {
        this.portionSize = portionSize;
    }

    public String getCookTime() {
        return cookTime;
    }

    public void setCookTime(String cookTime) {
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
