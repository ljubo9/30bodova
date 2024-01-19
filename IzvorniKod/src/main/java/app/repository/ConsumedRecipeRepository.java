package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.recipe.ConsumedRecipe;

public interface ConsumedRecipeRepository extends JpaRepository<ConsumedRecipe, Integer>{

}
