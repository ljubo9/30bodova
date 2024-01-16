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

}
