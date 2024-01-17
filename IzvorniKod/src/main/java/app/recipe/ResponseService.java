package app.recipe;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import  app.dto.*;
import java.util.Optional;

@Service
public class ResponseService {

    private final ResponseRepository responseRepository; // Assuming you have a repository for Response

    @Autowired
    public ResponseService(ResponseRepository responseRepository) {
        this.responseRepository = responseRepository;
    }

    public ResponseDTO getResponseByReviewId(int reviewId) {
        // Assuming you have a method in your repository to get response by reviewId
        Optional<Response> responseOptional = responseRepository.findByResponseGivenToId(reviewId);

        if (responseOptional.isPresent()) {
            return ResponseDTO.fromEntity(responseOptional.get());
        } else {
            return null; // Or throw an exception or handle it according to your needs
        }
    }
}
