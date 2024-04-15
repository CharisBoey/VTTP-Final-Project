package sg.com.vttp.Final.Project.Repositories;

import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;

import sg.com.vttp.Final.Project.Models.FixedPhoto;
import sg.com.vttp.Final.Project.Models.ServiceRequest;
import sg.com.vttp.Final.Project.Models.UpdateServiceRequest;
import sg.com.vttp.Final.Project.Models.UpdateServiceRequestStatus;

@Repository
public class ServiceRequestRepository {
    
    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    FixedPhotoRepository fixedPhotoRepo;

    public void insertSvcReq(ServiceRequest payload){

		Document svcReq = new Document();

		svcReq.put("requestID", payload.getRequestID());
		svcReq.put("request", payload.getRequest());
		svcReq.put("duedate", payload.getDuedate());
		svcReq.put("completeddate", payload.getCompleteddate());
		svcReq.put("priority", payload.getPriority());
		svcReq.put("photo", payload.getPhoto());
		svcReq.put("fixedphoto", payload.getFixedphoto());
		svcReq.put("locationaddress", payload.getLocationaddress());
		svcReq.put("adminname", payload.getAdminname());
		svcReq.put("contractorname", payload.getContractorname());
		svcReq.put("approvalstatus", payload.getApprovalstatus());
		svcReq.put("rejectreason", payload.getRejectreason());

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
            svcReq.setCompleteddate(d.getString("completeddate"));
            svcReq.setPriority(d.getInteger("priority"));
            svcReq.setPhoto(d.getString("photo"));
            svcReq.setFixedphoto(d.getString("fixedphoto"));
            svcReq.setLocationaddress(d.getString("locationaddress"));
            svcReq.setAdminname(d.getString("adminname"));
            svcReq.setContractorname(d.getString("contractorname"));
            svcReq.setApprovalstatus(d.getString("approvalstatus"));
            svcReq.setRejectreason(d.getString("rejectreason"));

            svcReqList.add(svcReq);
        }

        return svcReqList;
    }

    public ServiceRequest findAllSvcReqByID(String requestID){

        Criteria criteria = Criteria.where("requestID").is(requestID);
        Query query = Query.query(criteria);
        List<Document> result_findByID_Document = mongoTemplate.find(query, Document.class,"servicerequest");
		System.out.println("FindByID_Doc:"+result_findByID_Document.toString());


        Document d = result_findByID_Document.get(0);
        ServiceRequest svcReq = new ServiceRequest();
        svcReq.setRequestID(d.getString("requestID"));
        svcReq.setRequest(d.getString("request"));
        svcReq.setDuedate(d.getString("duedate"));
        svcReq.setCompleteddate(d.getString("completeddate"));
        svcReq.setPriority(d.getInteger("priority"));
        svcReq.setPhoto(d.getString("photo"));
        svcReq.setFixedphoto(d.getString("fixedphoto"));
        svcReq.setLocationaddress(d.getString("locationaddress"));
        svcReq.setAdminname(d.getString("adminname"));
        svcReq.setContractorname(d.getString("contractorname"));
        svcReq.setApprovalstatus(d.getString("approvalstatus"));
        svcReq.setRejectreason(d.getString("rejectreason"));
        
        return svcReq;
    }

    public void updateSvcReq(UpdateServiceRequest updSvcReq) {

        String reqID = updSvcReq.getRequestID();

        //FIRST TIME CONTRACTOR SUBMITS PHOTO
        Query query = Query.query(Criteria.where("requestID").is(reqID));

        Update updateOperation = new Update()
        .set("fixedphoto", updSvcReq.getFixedphoto())
        .set("contractorname", updSvcReq.getContractorname());

        UpdateResult result = mongoTemplate.updateMulti(query, updateOperation, "servicerequest");

        System.out.printf("Documents updated: %d\n", result.getModifiedCount());
        
    }

    
    public void updateSvcReqStatus(UpdateServiceRequestStatus updSvcReqStatus) {
        Query query = Query.query(Criteria.where("requestID").is(updSvcReqStatus.getRequestID()));

        Update updateOperation = new Update()
        .set("approvalstatus", updSvcReqStatus.getApprovalstatus())
        .set("rejectreason", updSvcReqStatus.getRejectreason());

        UpdateResult result = mongoTemplate.updateMulti(query, updateOperation, "servicerequest");

        System.out.printf("Documents updated: %d\n", result.getModifiedCount());
    }

}
