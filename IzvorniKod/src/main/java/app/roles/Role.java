package app.roles;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Role {
	public final static int clientRoleID = 1;
	public final static int enthusiastRoleID = 2;
	public final static int nutritionistRoleID = 3;
	public final static int adminRoleID = 4;
	
	public final static Role ENTHUSIAST = new Role(enthusiastRoleID, "ENTHUSIAST");
	public final static Role NUTRITIONIST = new Role(nutritionistRoleID, "NUTRITIONIST");
	public final static Role CLIENT = new Role(clientRoleID, "CLIENT");
	public final static Role ADMIN = new Role(adminRoleID, "ADMIN");


	@Id
	private int id;
	private String name;
	
	public Role(int id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public Role() {
		
	}
	
	public int getId() {
		return id;
	}
	public String getName() {
		return name;
	}
}
