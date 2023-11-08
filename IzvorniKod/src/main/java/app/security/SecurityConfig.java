package app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import app.roles.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	UserService userService;
	BCryptPasswordEncoder BCryptPasswordEncoder;
	
	@Autowired
	public SecurityConfig(UserService userService, BCryptPasswordEncoder BCryptPasswordEncoder) {
		this.userService = userService;
		this.BCryptPasswordEncoder = BCryptPasswordEncoder;
	}
	
	@Bean
	protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests((authorize) -> authorize
									.requestMatchers("/login", "/register")
									.permitAll()
									.anyRequest().authenticated());
		
		return http.build();	
	}
	
	@Bean
	public AuthenticationManager authenticationManager() {
		return new ProviderManager(daoAuthenticationProvider());
	}
	
	
	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(BCryptPasswordEncoder);
		provider.setUserDetailsService(userService);
		return provider;
	}
	
	
}
