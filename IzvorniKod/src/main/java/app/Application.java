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
	private UserRepository UserRepo;
	private User user1;
	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(Application.class);
		Application appInstance = application.run(args).getBean(Application.class);

		appInstance.interactWithUserRepo(); // Jednostavni test za bazu podataka

	}

	public void interactWithUserRepo() {
		User employee = new User("ivan", "ivan", "pavlovic", "hehexd","sdfs");
		UserRepo.save(employee);
		Enthusiast emp=new Enthusiast("sdf","df","ds","sdf","dfsf");
		UserRepo.save(emp);
	}
}

