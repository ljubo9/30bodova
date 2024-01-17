package app.recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResponseRepository extends JpaRepository<Response, Long> {



    Optional<Response> findByResponseGivenToId(int reviewId);


}
