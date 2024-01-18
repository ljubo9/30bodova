package app.recipe;

import jakarta.persistence.*;


@Entity
public class DietIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Diet diet;

    @ManyToOne
    private Ingredient ingredient;

    private int maxAmountGrams;

    public DietIngredient(Diet diet, Ingredient ingredient, int maxAmountGrams) {
        this.diet = diet;
        this.ingredient = ingredient;
        this.maxAmountGrams = maxAmountGrams;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Diet getDiet() {
        return diet;
    }

    public void setDiet(Diet diet) {
        this.diet = diet;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public int getMaxAmountGrams() {
        return maxAmountGrams;
    }

    public void setMaxAmountGrams(int maxAmountGrams) {
        this.maxAmountGrams = maxAmountGrams;
    }


}
