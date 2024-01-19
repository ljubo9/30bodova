package app.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import app.recipe.Category;
import app.recipe.Recipe;
import app.repository.RecipeRepository;
import app.repository.UserRepository;
import app.roles.Enthusiast;
import app.roles.User;

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
        Enthusiast newUser = new Enthusiast("newUsername", "newPassword", "newName", "newSurname", null, "ja sam",  "newEmail@mail.com");
        Enthusiast otherUser = new Enthusiast("otherUsername", "otherPassword", "otherName", "otherSurname", null, "ja nisam", "otherEmail@mail.com");
        Recipe tortillas = new Recipe("Mexican tortillas", 4, 60, newUser);
        Recipe chilli = new Recipe("Chilli con carne", 2, 120, newUser);
        Recipe enchiladas = new Recipe("Chicken enchiladas", 4, 45, otherUser);
        Set<Recipe> listNew = new HashSet<>();
        listNew.add(tortillas);
        listNew.add(chilli);
        newUser.setRecipes(listNew);
        
        when(userRepository.findUserByUsername(newUser.getUsername())).thenReturn(Optional.of(newUser));

        Set<Recipe> fetchedSet = recipeService.getRecipesByUsername(newUser.getUsername());

        assertNotNull(fetchedSet);
        assertEquals(listNew, fetchedSet);
    }

    @Test
    public void loadRecipesCategoryValidTest(){
        Category mex = new Category("mexican");
        User newUser = new User("newUsername", "newPassword", "newName", "newSurname", "newEmail@mail.com");
        Recipe tortillas = new Recipe("Mexican tortillas", 4, 60, newUser, mex);
        Recipe chilli = new Recipe("Chilli con carne", 2, 120, newUser, mex);
        Recipe enchiladas = new Recipe("Chicken enchiladas", 4, 45, newUser, new Category("salty"));

        List<Recipe> recipesList = new ArrayList<>();
        recipesList.add(tortillas);
        recipesList.add(chilli);
        recipesList.add(enchiladas);

        when(recipeRepository.findAll()).thenReturn(recipesList);

        Set<Recipe> mexicanRecipes = recipeService.getRecipesByCategory(mex);
        Set<Recipe> recipes = new HashSet<>();
        recipes.add(tortillas);
        recipes.add(chilli);

        assertNotNull(mexicanRecipes);
        assertEquals(recipes, mexicanRecipes);
    }
}
