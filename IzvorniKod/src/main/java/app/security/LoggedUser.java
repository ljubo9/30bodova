package app.security;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpSessionBindingEvent;
import jakarta.servlet.http.HttpSessionBindingListener;


public class LoggedUser implements HttpSessionBindingListener {
	
	private String username;
	private ActiveUserStore activeUserStore;
	
	
	public LoggedUser(String username, ActiveUserStore activeUserStore) {
		this.username = username;
		this.activeUserStore = activeUserStore;
	}

	@Override
	public void valueBound(HttpSessionBindingEvent event) {
		LoggedUser user = (LoggedUser) event.getValue();
		if (!activeUserStore.getUsers().contains(user.getUsername())) {
			activeUserStore.getUsers().add(user.getUsername());
		}
	}

	@Override
	public void valueUnbound(HttpSessionBindingEvent event) {
		LoggedUser user = (LoggedUser) event.getValue();
		if (activeUserStore.getUsers().contains(user.getUsername())) {
			activeUserStore.getUsers().remove(user.getUsername());
		}
		
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
}
