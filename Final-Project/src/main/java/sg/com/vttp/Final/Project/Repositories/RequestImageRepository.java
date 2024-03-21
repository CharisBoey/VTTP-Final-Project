package sg.com.vttp.Final.Project.Repositories;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;


@Repository
public class RequestImageRepository {
    
    @Autowired
    private AmazonS3 s3;

    public String saveToS3(String requestID, MultipartFile photo) throws IOException{

        InputStream is = photo.getInputStream();
        String contentType = photo.getContentType();
        Long photoLength = photo.getSize();


        ObjectMetadata metadata = new ObjectMetadata();
        Map<String, String> mydata = new HashMap<>();
        mydata.put("proj", "final");
        metadata.setContentType(contentType);
        metadata.setContentLength(photoLength);
        metadata.setUserMetadata(mydata);


        PutObjectRequest putReq = new PutObjectRequest(
         "astronaut" // bucket name
         , "images/%s".formatted(requestID),  // key
         is, metadata);
        putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);

        PutObjectResult result = s3.putObject(putReq);

        String key = "images/%s".formatted(requestID);

        return s3.getUrl("astronaut", key).toExternalForm();
    }
    
}
