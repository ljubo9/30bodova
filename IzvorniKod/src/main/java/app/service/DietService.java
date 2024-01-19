package app.service;

import app.recipe.Diet;
import app.repository.DietRepository;
import org.springframework.stereotype.Service;

@Service
public class DietService {
	private final DietRepository dietRepository;
	
	public DietService(DietRepository dietRepository) {
		this.dietRepository = dietRepository;
	}

	public void addDiet(Diet d) {
		// TODO Auto-generated method stub
		dietRepository.save(d);
	}
}
