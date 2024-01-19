package app.repository;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import app.recipe.Category;
import app.recipe.Label;

public interface LabelRepository extends JpaRepository<Label, Integer>{


	@Query("SELECT l FROM label WHERE l.name = ?1")
	Optional<Label> findByName(String name);
}
