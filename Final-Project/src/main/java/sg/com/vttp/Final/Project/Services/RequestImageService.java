package sg.com.vttp.Final.Project.Services;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import sg.com.vttp.Final.Project.Models.RequestImage;
import sg.com.vttp.Final.Project.Repositories.RequestImageRepository;

@Service
public class RequestImageService {
    
    @Autowired
    RequestImageRepository reqImgRepo;
    
    public String postImage(String requestID, MultipartFile photo) {
		//saveToDigitalOcean - image
		try {
			//reqImgRepo.saveToS3(requestID, photo);
            String url = reqImgRepo.saveToS3(requestID, photo);
            return url;
		} catch (IOException ex) {
          ex.printStackTrace();
		}
		

		//save to MONGODB - postdetails
		//newsRepo.saveArtMongo(newsId, title, description, tags);
		
	  return "unsuccessful";
	}

    /* public void deleteImage(String requestID) {
        return reqImgRepo.deleteImage(requestID);
    } */

}
