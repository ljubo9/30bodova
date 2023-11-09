package app.recipe;

import app.roles.User;
import jakarta.persistence.*;

@Entity
@Table(name="Responses")
public class Response {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int responseId;
    @ManyToOne
    private User creator;
    @OneToOne(cascade = CascadeType.ALL)
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
}
