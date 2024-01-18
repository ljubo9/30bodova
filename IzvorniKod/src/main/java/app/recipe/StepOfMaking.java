package app.recipe;

import jakarta.persistence.*;

@Entity
public class StepOfMaking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Recipe recipe;

    private int stepNum;

    private String description;

    @OneToOne
    private Image image;

    public StepOfMaking(Recipe recipe, int stepNum, String description, Image image) {
        this.recipe = recipe;
        this.stepNum = stepNum;
        this.description = description;
        this.image = image;
    }

    public StepOfMaking() {
    	
    }
    
    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public int getStepNum() {
        return stepNum;
    }

    public void setStepNum(int stepNum) {
        this.stepNum = stepNum;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

}
