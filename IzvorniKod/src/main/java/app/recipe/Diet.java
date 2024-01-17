package app.recipe;

import app.roles.User;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String opis;

    @OneToMany
    private List<Recipe> allowedRecipes;
    @ManyToOne
    private User creator;

    @OneToMany
    private List<User> users;

    public Diet() {
    	
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public List<Recipe> getAllowedRecipes() {
        return allowedRecipes;
    }

    public void setAllowedRecipes(List<Recipe> allowedRecipes) {
        this.allowedRecipes = allowedRecipes;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }


}
