package app.repository;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import app.recipe.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{

	
	@Query("SELECT c FROM category WHERE c.name = ?1")
	Optional<Category> findByName(String name);

}
