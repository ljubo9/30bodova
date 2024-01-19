package app.roles;

import app.repository.UserRepository;
import app.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class UserRetrieveDataTest {
    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    public void UserRetrieveDataValidTest(){
        User newUser = new User();
        newUser.setUsername("newUser");
        newUser.setPassword("newPassword");
        newUser.setName("New");
        newUser.setSurname("User");

        when(userRepository.findUserByUsername(newUser.getUsername())).thenReturn(Optional.of(newUser));

        User userDetails = userService.loadUserByUsername(newUser.getUsername());

        assertNotNull(userDetails);
        compareUsers(newUser, userDetails);
    }

    private void compareUsers(User newUser, User userDetails) {
        assertEquals(newUser.getUsername(), userDetails.getUsername());
        assertEquals(newUser.getPassword(), userDetails.getPassword());
        assertEquals(newUser.getName(), userDetails.getName());
        assertEquals(newUser.getSurname(), userDetails.getSurname());
    }
}

