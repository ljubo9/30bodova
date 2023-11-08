package app;


import app.roles.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Application {

	/*public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}*/
	@Autowired
	private UserService userRepo;
	private User user1;
	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(Application.class);
		Application appInstance = application.run(args).getBean(Application.class);

		appInstance.interactWithUserRepo(); // Jednostavni test za bazu podataka

	}

	public void interactWithUserRepo() {
		userRepo.addUser(new Client("Fran", "lozinka", "Širić", "Širić"));
	}
}

