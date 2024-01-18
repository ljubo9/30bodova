package app.roles;

import java.util.Set;

import app.recipe.Cookbook;
import app.recipe.Image;
import app.recipe.Recipe;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Enthusiast extends SpecialUser {


	@OneToMany(mappedBy="creator", cascade = CascadeType.ALL)
	private Set<Recipe> recipes;
	
	@OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
	private Set<Cookbook> cookbooks;
	
	public Enthusiast(String username, String password, String name, String surname, Image photo, String biography, String email) {
		super(username, password, name, surname, Role.ENTHUSIAST, photo, biography, email);
		// TODO Auto-generated constructor stub
	}

	public Enthusiast(String username, String password, String name, String surname, Role role, Image photo,
			String biography, String email) {
		// TODO Auto-generated constructor stub
		super(username, password, name, surname, Role.ENTHUSIAST, photo, biography, email);

	}

	public Set<Recipe> getRecipes() {
		return recipes;
	}

	public void setRecipes(Set<Recipe> recipes) {
		this.recipes = recipes;
	}

	public Set<Cookbook> getCookbooks() {
		return cookbooks;
	}

	public void setCookbooks(Set<Cookbook> cookbooks) {
		this.cookbooks = cookbooks;
	}
	
	
	
	

}
