package app.recipe;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query("SELECT r FROM Review r WHERE r.id = ?1")
    Optional<Review> findReviewById(int reviewId);

    @Query("SELECT r.response FROM Review r WHERE r.id = ?1")
    Optional<Response> findResponseByReviewId(int reviewId);
}