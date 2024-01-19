package app.recipe;
import app.roles.*;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class ConsumedRecipe {

	@Id
	@SequenceGenerator(
			name = "consumed_recipe_sequence",
			sequenceName = "student_sequence",
			allocationSize = 1
	)
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "consumed_recipe_sequence")
	@Column(columnDefinition = "serial", insertable = false)
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
    
    

}
