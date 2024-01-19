package app.service;
import java.util.Optional;

import app.recipe.Image;
import app.repository.StorageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class StorageService {

    @Autowired
    private StorageRepository repository;

    public String uploadImage(MultipartFile file) throws IOException {
        Image img= new Image(file.getOriginalFilename(), file.getBytes());
        repository.save(img);
        if(img!=null){
            return  "File uploded successfully: "+file.getOriginalFilename();
        }
        return null;
    }

    public byte[] downloadImage(int id){
        Optional<Image> optionalImage =  repository.findById(id);
        if (optionalImage.isPresent()) {
            Image image = optionalImage.get();
            byte[] data = image.getImageData();
            return data;
        }
        else{
            throw new RuntimeException("Image with ID " + id + " not found");
        }

    }
}
