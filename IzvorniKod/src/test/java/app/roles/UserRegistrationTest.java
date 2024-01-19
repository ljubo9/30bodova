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
class UserRegistrationTest {
    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    public void registrationValidTest(){
        User newUser = new User();
        newUser.setUsername("registeredUser");
        newUser.setPassword("registeredPassword");
        newUser.setName("registeredName");
        newUser.setSurname("registeredSurname");

        when(userRepository.findUserByUsername(newUser.getUsername())).thenReturn(Optional.empty());

        assertDoesNotThrow(() -> userService.registerUser(newUser));
        boolean registrationSuccessful = userService.registerUser(newUser);
        assertTrue(registrationSuccessful);
    }
}
