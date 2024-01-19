package app.repository;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import app.recipe.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer>{

	@Query("SELECT i FROM ingredient WHERE i.name = ?1")
	Optional<Ingredient> findByName(String name);
	
}
