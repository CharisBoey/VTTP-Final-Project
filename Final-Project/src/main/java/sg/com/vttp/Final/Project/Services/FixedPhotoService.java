package sg.com.vttp.Final.Project.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.com.vttp.Final.Project.Repositories.FixedPhotoRepository;

@Service
public class FixedPhotoService {
    
    @Autowired
    FixedPhotoRepository fixedPhotoRepo;

    public Integer findSvcReqFixedPhotoCountByID(String requestID){
        return fixedPhotoRepo.findSvcReqFixedPhotoCountByID(requestID);
    }
}
