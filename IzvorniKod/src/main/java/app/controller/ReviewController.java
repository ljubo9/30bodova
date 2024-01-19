package app.controller;

import app.recipe.Recipe;
import app.recipe.Response;
import app.recipe.Review;
import app.service.RecipeService;
import app.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.dto.ResponseDTO;
import app.roles.User;
import app.service.UserService;


@RestController
@RequestMapping()
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final RecipeService recipeService;

    

    @Autowired
    public ReviewController(ReviewService reviewService, UserService userService, RecipeService recipeService) {
        this.reviewService = reviewService;
		this.userService = userService;
		this.recipeService = recipeService;
    }

    @GetMapping(path = "/response?reviewId={reviewId}")
    public ResponseEntity<ResponseDTO> getResponseByReviewId(@PathVariable int reviewId) {
    	try {
    		ResponseDTO res = reviewService.loadResponseByReviewId(reviewId);
    		if (res == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		return new ResponseEntity<>(res, HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could not get response by review id");    	
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	
    }
    
    @PostMapping(path = "/response", consumes = "multipart/form-data") 
    public ResponseEntity<String> putResponseToReview(@RequestParam("reviewId") int id, @RequestParam("message") String message, @RequestParam("username") String username) {
    	try {
    		Review r =	reviewService.loadReviewById(id);
    		User u = (User) userService.loadUserByUsername(username);
    		if (u == null || r == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		Response res =  new Response(u, r, message);
    		reviewService.addResponse(res);
    		return new ResponseEntity<>(HttpStatus.OK);
    	}
    	catch (Exception e) {
    		System.out.println("Could not put response to review");    	
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
    @PostMapping(path = "/review", consumes = "multipart/form-data") 
    public ResponseEntity<String> addReview(@RequestParam("recipeId") int recipeId, @RequestParam("message") String message, @RequestParam("mark") int mark, @RequestParam("username") String username) {
    	try {
    		Recipe r = recipeService.loadRecipeById(recipeId);
    		User u = (User) userService.loadUserByUsername(username);
    		if (r == null || u == null) {
    			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    		}
    		Review rev = new Review(u, r, mark, message);
    		reviewService.addReview(rev);
    		return new ResponseEntity<>(HttpStatus.OK);
    	}
    	catch(Exception e) {
    		System.out.println("Could not add review:");
    		e.printStackTrace();
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
}
