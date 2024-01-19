package app.roles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import app.repository.UserRepository;
import app.service.UserService;

@SpringBootTest
class UserChangeInfoTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private BCryptPasswordEncoder encoder;

    @Test
    public void userChangeInfoValidTest(){
        when(encoder.encode(anyString())).thenReturn("encodedUpdatedPassword");

        User originalUser = new User();
        originalUser.setId(1);
        originalUser.setUsername("originalUsername");
        originalUser.setPassword("originalPassword");
        originalUser.setName("originalName");
        originalUser.setSurname("originalSurname");

        User updatedUser = new User();
        updatedUser.setId(1);
        updatedUser.setUsername("updatedUsername");
        updatedUser.setPassword("originalPassword");
        updatedUser.setName("updatedName");
        updatedUser.setSurname("originalSurname");

        when(userRepository.findById(originalUser.getId())).thenReturn(Optional.of(originalUser));
        when(userRepository.save(any())).thenReturn(updatedUser);

        userService.changeInfo(updatedUser);

        verify(userRepository, times(1)).findById(originalUser.getId());
        verify(userRepository, times(1)).save(any(User.class));

        assertEquals("updatedUsername", originalUser.getUsername());
        assertEquals("encodedUpdatedPassword", originalUser.getPassword());
        assertEquals("updatedName", originalUser.getName());
        assertEquals("originalSurname", originalUser.getSurname());
    }
}
