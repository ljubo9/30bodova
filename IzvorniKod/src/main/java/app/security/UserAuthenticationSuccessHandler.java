package app.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler{
	
	ActiveUserStore activeUserStore;
	
	@Autowired
	public UserAuthenticationSuccessHandler(ActiveUserStore activeUserStore) {
		this.activeUserStore = activeUserStore;
	}
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession(false);
		if (session != null) {
			LoggedUser user = new LoggedUser(authentication.getName(), activeUserStore);
			session.setAttribute("user", user);		}
		
	}
	
}
