package app.repository;

import java.util.List;

import app.recipe.Cookbook;
import org.springframework.data.jpa.repository.JpaRepository;

import app.roles.User;

public interface CookbookRepository extends JpaRepository<Cookbook, Integer>{
	
	@Override
    List<Cookbook> findAll();
}
