package app.recipe;

import app.roles.SpecialUser;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    	
	@Query("SELECT r FROM recipe WHERE r.id = ?1")
    Optional<Recipe> findRecipeById(int id);


}
