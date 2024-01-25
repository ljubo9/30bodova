package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.recipe.StepOfMaking;

public interface StepOfMakingRepository extends JpaRepository<StepOfMaking, Integer>{

}
