package app.service;

import app.roles.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class LoadingRecipesTest {
    @MockBean
    private UserRepository userRepository;

    @Autowired
    private RecipeService userService;

    @Test
    public void loadRecipesValidTest(){
        
    }
}
