package app.recipe;

import app.roles.User;
import jakarta.persistence.*;

@Entity
public class Response {

    public int getId() {
        return id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    private User creator;
    
    @ManyToOne(cascade = CascadeType.ALL)
    private Review responseGivenTo;

    public Response(User creator, Review responseGivenTo, String message) {
        this.creator = creator;
        this.responseGivenTo = responseGivenTo;
        this.message = message;
    }


    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Review getResponseGivenTo() {
        return responseGivenTo;
    }

    public void setResponseGivenTo(Review responseGivenTo) {
        this.responseGivenTo = responseGivenTo;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private String message;
    public int getReviewId() {
        if (responseGivenTo != null) {
            return responseGivenTo.getId();
        }
        return 0; // or throw an exception, depending on your use case
    }
}
