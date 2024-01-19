package app.service;

import app.repository.DietRepository;
import org.springframework.stereotype.Service;

@Service
public class DietService {
	private final DietRepository dietRepository;
	
	public DietService(DietRepository dietRepository) {
		this.dietRepository = dietRepository;
	}
}
