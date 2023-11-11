package app.recipe;

import jakarta.persistence.*;

@Entity
@Table(name="Images")
public class Image {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageId;
    private String imageUrl;
    
    @ManyToOne
    private Recipe recipe;
    
    // Constructors, getters, setters
}
