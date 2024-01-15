package app.recipe;

import app.roles.SpecialUser;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    public interface ResponseRepository extends JpaRepository<Response, Integer> {
        Optional<Response> findByReviewId(int reviewId);
    }

}
