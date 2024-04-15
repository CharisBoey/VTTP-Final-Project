package sg.com.vttp.Final.Project.Repositories;

import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.UpdateResult;

import sg.com.vttp.Final.Project.Models.FixedPhoto;

@Repository
public class FixedPhotoRepository {

    @Autowired
    MongoTemplate mongoTemplate;
    
    public void insertSvcReqFixedPhotoCount(FixedPhoto input){
		Document svcReqFixedPhoto = new Document();

		svcReqFixedPhoto.put("requestID", input.getRequestID());
		svcReqFixedPhoto.put("fixedphotocount", input.getFixedphotocount());

		mongoTemplate.insert(svcReqFixedPhoto, "servicerequestfixedcount");
        
    }

    public void updateSvcReqFixedPhotoCount(FixedPhoto input) {
        Query query = Query.query(Criteria.where("requestID").is(input.getRequestID()));

        Update updateOperation = new Update()
        .set("fixedphotocount", input.getFixedphotocount());

        UpdateResult result = mongoTemplate.updateMulti(query, updateOperation, "servicerequestfixedcount");

        //System.out.printfs("Documents Count updated: %d\n", result.getModifiedCount());
    }


    public List<Document> findSvcReqFixedPhotoCountByID(String requestID){

        Criteria criteria = Criteria.where("requestID").is(requestID);
        Query query = Query.query(criteria);
        List<Document> result_findByID_Document = mongoTemplate.find(query, Document.class,"servicerequestfixedcount");
        		
        return result_findByID_Document;
       
    }
}
