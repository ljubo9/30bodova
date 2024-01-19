package app.dto;

import app.recipe.Category;

public class CategoryDTO {
	public int id;
	public String name;
	
	public CategoryDTO(Category cat) {
		this.id = cat.getId();
		this.name = cat.getName();
	}
}
