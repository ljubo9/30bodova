package app.recipe;

import app.roles.User;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name="Cookbooks")
public class Cookbook {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cookbookId;
    private String name;
    private String category;
    @ManyToMany
    @JoinTable(
    		name = "cookbook_recipes",
    		joinColumns = @JoinColumn(name = "cookbook_id"),
    		inverseJoinColumns = @JoinColumn(name = "recipe_id"))
    private List<Recipe> recipes;
    @ManyToOne
    private User creator;
    
    public Cookbook(int id, String name, String category, Set<Recipe> recipes) {
        this.cookbookId = id;
        this.name = name;
        this.category = category;
        /*this.recipes = recipes;*/
    }


    public int getId() {
        return cookbookId;
    }

    public void setId(int id) {
        this.cookbookId = id;
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
