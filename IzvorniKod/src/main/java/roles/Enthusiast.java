package roles;

public class Enthusiast extends Person {

	public Enthusiast(String username, String password, String name, String surname) {
		super(username, password, name, surname);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Role getRole() {
		// TODO Auto-generated method stub
		return Role.ENTHUSIAST;
	}

}