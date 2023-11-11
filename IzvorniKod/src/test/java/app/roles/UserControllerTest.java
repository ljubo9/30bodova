package app.roles;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.security.authentication.AuthenticationManager;

class UserControllerTest {
	
	@Mock
	UserService userService;
	@Mock
	AuthenticationManager authenticationManager;
	
	
	@Test
	void testRegister() {
		
	}

}
