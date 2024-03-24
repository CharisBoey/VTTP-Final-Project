package sg.com.vttp.Final.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.com.vttp.Final.Project.Models.ServiceRequest;
import sg.com.vttp.Final.Project.Repositories.ServiceRequestRepository;

@Service
public class ServiceRequestService {
    
    @Autowired
    ServiceRequestRepository svcReqRepo;

    public void insertSvcReq(ServiceRequest payload) {
        svcReqRepo.insertSvcReq(payload);
    }

    public List<ServiceRequest> findAllSvcReq (){
        return svcReqRepo.findAllSvcReq();
    }

}
