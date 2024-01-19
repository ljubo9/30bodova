package app.repository;


import app.roles.SpecialUser;
import app.roles.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Override
    List<User> findAll();
    
    @Query("SELECT u FROM users WHERE u.email = ?1")
    Optional<List<User>> findUserByEmail(String email);
    
    @Query("SELECT u FROM users WHERE u.username = ?1")
    Optional<User> findUserByUsername(String username);
}


