package app.dto;

import app.recipe.Cookbook;

public class CookbookDTO {

	public int id;
    public String name;
    public CategoryDTO category;
    public int creatorid;
    public String creator;
    
    public CookbookDTO() {
    	
    }
    
    public CookbookDTO(Cookbook c) {
    	this.id = c.getId();
    	this.name = c.getName();
    	this.category = new CategoryDTO(c.getCategory());
    	this.creatorid = c.getCreator().getId();
    	this.creator = c.getCreator().getUsername();
    }
    
}
