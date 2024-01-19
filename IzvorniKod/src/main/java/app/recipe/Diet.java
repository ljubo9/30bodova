package app.recipe;

import java.util.List;
import app.roles.User;
import jakarta.persistence.*;



@Entity
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;

    @ManyToMany
    private List<Recipe> recipes;
    @ManyToOne
    private User creator;

    @OneToMany
    private List<DietIngredient> dietIngredients;

    @OneToMany(mappedBy = "diet")
    private List<User> users;

    public Diet() {
    	
    }

    public List<DietIngredient> getDietIngredients() {
        return dietIngredients;
    }

    public void setDietIngredients(List<DietIngredient> dietIngredients) {
        this.dietIngredients = dietIngredients;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }


}
