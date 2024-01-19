package app.recipe;
import app.roles.*;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class ConsumedRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    Recipe recipe;

    @ManyToOne
	@JoinTable(
			name = "user_consumed_recipes",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "recipe_id"),
			uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "recipe_id"}))
    User user;

    Date date;
    
    

	public ConsumedRecipe(int id, Recipe recipe, User user, Date date) {
		super();
		this.id = id;
		this.recipe = recipe;
		this.user = user;
		this.date = date;
	}

	public ConsumedRecipe() {
		
	}
	
	public int getId() {
		return id;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public User getUser() {
		return user;
	}

	public Date getDate() {
		return date;
	}
    
    

}
