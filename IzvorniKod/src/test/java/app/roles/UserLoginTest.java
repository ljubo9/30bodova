package app.roles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import java.util.Optional;

import app.repository.UserRepository;
import app.service.UserService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class UserLoginTest {

    @MockBean
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder encoder;
    static User newUser;
    @BeforeAll
    public static void initUser(){
        newUser = new User();
        newUser.setUsername("newUser");
        newUser.setPassword("newPassword");
        newUser.setName("New");
        newUser.setSurname("User");
    }
    @Test
    public void loginValidTest(){
    	User encryptedUser = new User();
    	encryptedUser.setUsername(newUser.getUsername());
    	String password = encoder.encode(newUser.getPassword());
    	encryptedUser.setPassword(password);
        when(userRepository.findUserByUsername(newUser.getUsername())).thenReturn(Optional.of(encryptedUser));
        
        User savedUser = userService.loginUser(newUser.getUsername(), newUser.getPassword());

        assertNotNull(savedUser);
        assertTrue(encoder.matches(newUser.getPassword(), savedUser.getPassword()));
    }

    @Test
    public void loginInvalidUsernameTest(){
        lenient().when(userRepository.findUserByUsername(newUser.getUsername())).thenReturn(Optional.of(newUser));

        User savedUser = userService.loginUser("falseUsername", "newPassword");

        assertNull(savedUser);
    }

    @Test
    public void loginInvalidPasswordTest(){
        lenient().when(userRepository.findUserByUsername(newUser.getUsername())).thenReturn(Optional.of(newUser));

        User savedUser = userService.loginUser("newUsername", "falsePassword");

        assertNull(savedUser);
    }
}

