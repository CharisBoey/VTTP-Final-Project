package sg.com.vttp.Final.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import sg.com.vttp.Final.Project.Models.ServiceRequest;
import sg.com.vttp.Final.Project.Models.UpdateServiceRequest;
import sg.com.vttp.Final.Project.Models.UpdateServiceRequestStatus;
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

    public ServiceRequest findAllSvcReqByID(String requestID){
        return svcReqRepo.findAllSvcReqByID(requestID);
    }

    public void updateSvcReq (UpdateServiceRequest updSvcReq) {
        svcReqRepo.updateSvcReq(updSvcReq);
    }

    public void updateSvcReqStatus (UpdateServiceRequestStatus updSvcReqStatus) {
        svcReqRepo.updateSvcReqStatus(updSvcReqStatus);
    }


    public JsonObject toJSON(ServiceRequest svcReq){
        return Json.createObjectBuilder()
        .add("requestID", svcReq.getRequestID())
        .add("request", svcReq.getRequest())
        .add("duedate", svcReq.getDuedate())
        .add("priority", svcReq.getPriority())
        .add("photo", svcReq.getPhoto())
        .add("fixedphoto", svcReq.getPhoto())
        .add("locationaddress", svcReq.getLocationaddress())
        .add("adminname", svcReq.getAdminname())        
        .build();
    }

}
