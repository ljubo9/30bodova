package app.recipe;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Label {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	private String name;
	
	public Label(String name) {
		this.name = name;
	}
	
	public Label() {
		
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}
	
	
}
