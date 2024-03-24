package sg.com.vttp.Final.Project.Repositories;

import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import sg.com.vttp.Final.Project.Models.ServiceRequest;

@Repository
public class ServiceRequestRepository {
    
    @Autowired
    MongoTemplate mongoTemplate;

    public void insertSvcReq(ServiceRequest payload){


		Document svcReq = new Document();

		svcReq.put("requestID", payload.getRequestID());
		svcReq.put("request", payload.getRequest());
		svcReq.put("duedate", payload.getDuedate());
		svcReq.put("priority", payload.getPriority());
		svcReq.put("photo", payload.getPhoto());

		mongoTemplate.insert(svcReq, "servicerequest");
        
    }

    public List<ServiceRequest> findAllSvcReq(){
        List<Document> result_findAll = mongoTemplate.findAll(Document.class, "servicerequest");
        System.out.println("FindAll:"+result_findAll.toString());

        List<ServiceRequest> svcReqList = new LinkedList<>();

        for (Document d : result_findAll){
            ServiceRequest svcReq = new ServiceRequest();
            svcReq.setRequestID(d.getString("requestID"));
            svcReq.setRequest(d.getString("request"));
            svcReq.setDuedate(d.getString("duedate"));
            svcReq.setPriority(d.getInteger("priority"));
            svcReq.setPhoto(d.getString("photo"));
            svcReqList.add(svcReq);
        }

        
        return svcReqList;
    }

    

}
