package app.recipe;
import java.util.Optional;

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
        Optional<Image> image=  repository.findById(id);

        return image.get().getImageData();

    }
}
