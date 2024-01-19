package app.recipe;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Category {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	private String name;
	
	public Category(String name) {
		this.name = name;
	}

	public Category() {
		
	}
	
	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}
	
	
}
