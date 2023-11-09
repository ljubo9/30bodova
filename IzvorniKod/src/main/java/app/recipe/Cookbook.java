package app.recipe;

import app.roles.User;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name="Cookbooks")
public class Cookbook {

    @Id
    private int id;
    private String name;
    private String category;
    /*@ManyToMany(mappedBy = "cookbooks")
    private List<Recipe> recipes;*/
    @ManyToOne
    private User creator;
    public Cookbook(int id, String name, String category, Set<Recipe> recipes) {
        this.id = id;
        this.name = name;
        this.category = category;
        /*this.recipes = recipes;*/
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

   /* public Set<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }*/

}
