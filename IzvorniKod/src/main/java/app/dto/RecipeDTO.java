package app.dto;
import app.recipe.*;

import java.util.List;
import java.util.stream.Collectors;

public class RecipeDTO {

    private int id;
    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStepsOfMaking() {
        return stepsOfMaking;
    }

    public void setStepsOfMaking(String stepsOfMaking) {
        this.stepsOfMaking = stepsOfMaking;
    }

    public int getPortionSize() {
        return portionSize;
    }

    public void setPortionSize(int portionSize) {
        this.portionSize = portionSize;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public List<RecipeIngredientDTO> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<RecipeIngredientDTO> ingredients) {
        this.ingredients = ingredients;
    }

    public List<ImageDTO> getImages() {
        return images;
    }

    public void setImages(List<ImageDTO> images) {
        this.images = images;
    }

    private String stepsOfMaking;
    private int portionSize;
    private int cookTime;
    private List<RecipeIngredientDTO> ingredients;
    private List<ImageDTO> images;


    // Constructors, getters, and setters

    public Recipe toEntity() {

        List<RecipeIngredient> recipeIngredients = this.ingredients.stream()
                .map(RecipeIngredientDTO::toEntity)
                .collect(Collectors.toList());


        List<Image> recipeImages = this.images.stream()
                .map(ImageDTO::toEntity)
                .collect(Collectors.toList());

        Recipe recipe = new Recipe(this.id,this.name,recipeIngredients,this.stepsOfMaking,this.portionSize,this.cookTime,recipeImages);


        // Convert RecipeIngredientDTO to RecipeIngredient entities


        return recipe;
    }

    public static RecipeDTO fromEntity(Recipe recipe) {
        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setId(recipe.getId());
        recipeDTO.setName(recipe.getName());
        recipeDTO.setStepsOfMaking(recipe.getStepsOfMaking());
        recipeDTO.setPortionSize(recipe.getPortionSize());
        recipeDTO.setCookTime(recipe.getCookTime());

        // Convert RecipeIngredient entities to RecipeIngredientDTOs
        List<RecipeIngredientDTO> recipeIngredientDTOs = recipe.getIngredients().stream()
                .map(RecipeIngredientDTO::fromEntity)
                .collect(Collectors.toList());
        recipeDTO.setIngredients(recipeIngredientDTOs);

        // Convert Image entities to ImageDTOs
        List<ImageDTO> imageDTOs = recipe.getImages().stream()
                .map(ImageDTO::fromEntity)
                .collect(Collectors.toList());
        recipeDTO.setImages(imageDTOs);

        return recipeDTO;
    }
}
