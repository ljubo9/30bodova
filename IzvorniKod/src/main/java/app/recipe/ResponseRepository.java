package app.recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResponseRepository extends JpaRepository<Response, Long> {


@Repository
public interface ResponseRepository extends JpaRepository<Response, Integer> {
	
    @Query("SELECT r FROM response WHERE  r.id = ?1")
	Optional<Response> findResponseById(int responseId);
    

}
