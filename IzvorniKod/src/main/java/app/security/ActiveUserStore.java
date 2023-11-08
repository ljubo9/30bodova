package app.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class ActiveUserStore {
	private List<String> users;
	public ActiveUserStore() {
		users = new ArrayList<String>();
	}
	public List<String> getUsers() {
		return users;
	}
	public void setUsers(List<String> users) {
		this.users = users;
	}
	
}	


