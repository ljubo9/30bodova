package app.repository;

import app.recipe.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface StorageRepository extends JpaRepository<Image,Integer> {

    @Override
    Optional<Image> findById(Integer integer);


}
