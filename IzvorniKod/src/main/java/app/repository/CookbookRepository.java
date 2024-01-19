package app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import app.recipe.Cookbook;

public interface CookbookRepository extends JpaRepository<Cookbook, Integer>{
	
	@Override
    List<Cookbook> findAll();

	@Query("SELECT c FROM cookbook WHERE c.creator_id = ?1")
	Optional<List<Cookbook>> findByCreatorId(int id);
	
	
}
