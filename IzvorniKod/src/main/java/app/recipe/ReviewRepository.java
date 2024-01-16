package app.recipe;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    
    @Query("SELECT r FROM review WHERE  r.id = ?1")
	Optional<Review> findReviewById(int id);
    
    
}
