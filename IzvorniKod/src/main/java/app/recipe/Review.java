package app.recipe;

import app.roles.User;
import jakarta.persistence.*;

@Entity
@Table(name="Reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;
    
    @ManyToOne
    private User creator;
    
    @ManyToOne
    private Recipe reviewGivenTo;
    
    private int mark;
    
    private String message;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Response response;

    public Review(User creator, Recipe reviewGivenTo, int mark, String message) {
        this.creator = creator;
        this.reviewGivenTo = reviewGivenTo;
        this.mark = mark;
        this.message = message;
    }



    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Recipe getReviewGivenTo() {
        return reviewGivenTo;
    }

    public void setReviewGivenTo(Recipe reviewGivenTo) {
        this.reviewGivenTo = reviewGivenTo;
    }

    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }
}
