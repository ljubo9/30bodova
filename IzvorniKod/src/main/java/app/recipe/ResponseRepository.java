package app.recipe;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Integer> {
	
    @Query("SELECT r FROM response WHERE  r.id = ?1")
	Optional<Review> findResponseById(int responseId);
    
    @Query("SELECT r FROM response WHERE r.response_given_to_id = ?1")
	Optional<Response> findResponseByReviewId(int reviewId);

}
