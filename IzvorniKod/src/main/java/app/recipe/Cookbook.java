package app.recipe;

import java.util.List;
import java.util.Set;

import app.roles.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.UniqueConstraint;

@Entity
public class Cookbook {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    
    @ManyToOne
    private Category category;
    @ManyToMany
    @JoinTable(
    		name = "cookbook_recipes",
    		joinColumns = @JoinColumn(name = "cookbook_id"),
    		inverseJoinColumns = @JoinColumn(name = "recipe_id"),
    	    uniqueConstraints = @UniqueConstraint(columnNames = {"cookbook_id", "recipe_id"}))
    private List<Recipe> recipes;
    
    @ManyToOne
    private User creator;
    
    public Cookbook( String name, Category category, Set<Recipe> recipes) {

        this.name = name;
        this.category = category;
        /*this.recipes = recipes;*/
    }

    public Cookbook( String name, Category category, User creator) {

        this.name = name;
        this.category = category;
        this.creator=creator;
    }
    
    public Cookbook() {
    	
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

	public List<Recipe> getRecipes() {
		return recipes;
	}

	public User getCreator() {
		return creator;
	}

	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}

   /* public Set<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }*/

	
    
}
