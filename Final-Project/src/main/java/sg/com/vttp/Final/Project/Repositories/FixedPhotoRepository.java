package sg.com.vttp.Final.Project.Repositories;

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


    public Integer findSvcReqFixedPhotoCountByID(String requestID){

        Criteria criteria = Criteria.where("requestID").is(requestID);
        Query query = Query.query(criteria);
        List<Document> result_findByID_Document = mongoTemplate.find(query, Document.class,"servicerequestfixedcount");
        		
        //if first update... add to mongotemplate to keep track of count --> 1
        //return number 1
		if (result_findByID_Document.isEmpty()){
			System.out.println("EMPTY");
			FixedPhoto fixedphoto = new FixedPhoto();
            fixedphoto.setRequestID(requestID);
            fixedphoto.setFixedphotocount(1);
            insertSvcReqFixedPhotoCount(fixedphoto);
            return 1;
		} else {
            //not first update, increase by 1
            Document d = result_findByID_Document.get(0);
            Integer fixedPhotoCount = d.getInteger("fixedphotocount");
            fixedPhotoCount += 1;
            FixedPhoto fixedphoto = new FixedPhoto();
            fixedphoto.setRequestID(requestID);
            fixedphoto.setFixedphotocount(fixedPhotoCount);
            updateSvcReqFixedPhotoCount(fixedphoto);
            return fixedPhotoCount;
        }
       
    }
}




// Find Fixed Photo Count:[Document{{_id=661bd734250a814bd3dcf12f, requestID=052b1168, fixedphotocount=1}}]
// COUNT>>>>>>>>>null2024-04-14T21:21:22.264+08:00 ERROR 756 --- [nio-8080-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because the return value of "sg.com.vttp.Final.Project.Repositories.FixedPhotoRepository.findSvcReqFixedPhotoCountByID(String)" is null] with root cause
