package app.repository;

import java.util.Optional;

import app.recipe.Response;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ResponseRepository extends JpaRepository<Response, Integer> {
	
    @Query("SELECT r FROM response WHERE  r.id = ?1")
	Optional<Response> findResponseById(int responseId);
    

}
