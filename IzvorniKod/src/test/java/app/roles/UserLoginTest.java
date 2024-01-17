package app.roles;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserLoginTest {

    @MockBean
    private  UserRepository userRepository;

    @Autowired
    private UserService userService;

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
        when(userRepository.findUserByUsername(newUser.getUsername())).thenReturn(Optional.of(newUser));

        User savedUser = userService.loginUser(newUser.getUsername(), newUser.getPassword());

        assertNotNull(savedUser);
        compareUsers(newUser, savedUser);
    }

    private void compareUsers(User newUser, User savedUser) {
        assertEquals(newUser.getUsername(), savedUser.getUsername());
        assertEquals(newUser.getPassword(), savedUser.getPassword());
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

