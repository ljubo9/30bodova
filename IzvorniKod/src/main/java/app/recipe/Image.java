package app.recipe;

import jakarta.persistence.*;

@Entity
public class Image {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String imageUrl;
    
    @ManyToOne
    private Recipe recipe;
    
    public Image(String imageUrl) {
    	this.imageUrl = imageUrl;
    }
    // Constructors, getters, setters
}
