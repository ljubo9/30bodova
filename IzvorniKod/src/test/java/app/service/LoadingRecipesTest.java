package app.service;

import app.recipe.Recipe;
import app.repository.RecipeRepository;
import app.roles.User;
import app.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class LoadingRecipesTest {
    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RecipeRepository recipeRepository;

    @Autowired
    private RecipeService recipeService;

    @Test
    public void loadRecipesUsernameValidTest(){
        User newUser = new User("newUsername", "newPassword", "newName", "newSurname");
        User otherUser = new User("otherUsername", "otherPassword", "otherName", "otherSurname");
        Recipe tortillas = new Recipe("Mexican tortillas", 4, 60, newUser);
        Recipe chilli = new Recipe("Chilli con carne", 2, 120, newUser);
        Recipe enchiladas = new Recipe("Chicken enchiladas", 4, 45, otherUser);

        when(userRepository.findUserByUsername(newUser.getUsername())).thenReturn(Optional.of(newUser));

        Set<Recipe> fetchedSet = recipeService.getRecipesByUsername(newUser.getUsername());
        Set<Recipe> expectedRecipes = new HashSet<>();
        expectedRecipes.add(tortillas);
        expectedRecipes.add(chilli);

        assertNotNull(fetchedSet);
        assertEquals(expectedRecipes, fetchedSet);
    }

    @Test
    public void loadRecipesCategoryValidTest(){
        User newUser = new User("newUsername", "newPassword", "newName", "newSurname");
        Recipe tortillas = new Recipe("Mexican tortillas", 4, 60, newUser, "mexican");
        Recipe chilli = new Recipe("Chilli con carne", 2, 120, newUser, "mexican");
        Recipe enchiladas = new Recipe("Chicken enchiladas", 4, 45, newUser, "salty");

        List<Recipe> recipesList = new ArrayList<>();
        recipesList.add(tortillas);
        recipesList.add(chilli);
        recipesList.add(enchiladas);

        when(recipeRepository.findAll()).thenReturn(recipesList);

        Set<Recipe> mexicanRecipes = recipeService.getRecipesByCategory("mexican");
        Set<Recipe> recipes = new HashSet<>();
        recipes.add(tortillas);
        recipes.add(chilli);

        assertNotNull(mexicanRecipes);
        assertEquals(recipes, mexicanRecipes);
    }
}
