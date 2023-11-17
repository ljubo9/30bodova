package app.recipe;

import jakarta.persistence.*;

@Entity
public class Image {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String imageUrl;
    
    
    public Image(String name, String imageUrl) {
    	this.imageUrl = imageUrl;
    }
    // Constructors, getters, setters
}
