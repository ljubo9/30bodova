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
    User user;

    Date date;
    
    

	public ConsumedRecipe(Recipe recipe, User user, Date date) {
		super();
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

	public void setRecipe(Recipe recipe) { this.recipe = recipe;}
	public void setDate(Date date) { this.date = date;}

	public void setUser(User user) { this.user = user;}
    
    

}
