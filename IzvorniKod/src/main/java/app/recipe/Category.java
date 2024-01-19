package app.recipe;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Category {


	@Id
	@SequenceGenerator(
			name = "diet_sequence",
			sequenceName = "student_sequence",
			allocationSize = 1
	)
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "diet_sequence")
	@Column(columnDefinition = "serial", insertable = false)
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
