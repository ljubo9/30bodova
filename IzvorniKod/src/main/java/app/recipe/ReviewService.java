package app.recipe;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import  app.dto.*;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository; // Assuming you have a repository for Response
    private final ResponseRepository responseRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ResponseRepository responseRepository) {
        this.reviewRepository = reviewRepository;
        this.responseRepository = responseRepository;
    }
   

    public Review loadReviewById(int reviewId) {
        // Assuming you have a method in your repository to get response by reviewId
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);

        return reviewOptional.orElse(null);
    }
    
    public ResponseDTO loadResponseByReviewId(int reviewId) {
    	Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
    	if (reviewOptional.isPresent()) {
    		return ResponseDTO.fromEntity(reviewOptional.get().getResponse());
    	}
    	return null;
    }

	public void addResponse(Response res) {
		// TODO Auto-generated method stub
		responseRepository.save(res);
	}
	
	public void addReview(Review rev) {
		reviewRepository.save(rev);
	}
}
