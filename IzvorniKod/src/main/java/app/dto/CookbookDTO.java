package app.dto;

import app.recipe.Cookbook;

public class CookbookDTO {

	public int id;
    public String name;
    public String category;
    public int creatorid;
    
    public CookbookDTO() {
    	
    }
    
    public CookbookDTO(Cookbook c) {
    	this.id = c.getId();
    	this.name = c.getName();
    	this.category = c.getCategory();
    	this.creatorid = c.getCreator().getId();
    }
    
}
