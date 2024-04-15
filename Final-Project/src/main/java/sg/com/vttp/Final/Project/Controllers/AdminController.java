package sg.com.vttp.Final.Project.Controllers;

import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import sg.com.vttp.Final.Project.Utils;
import sg.com.vttp.Final.Project.Models.Login;
import sg.com.vttp.Final.Project.Models.RequestImage;
import sg.com.vttp.Final.Project.Models.ServiceRequest;
import sg.com.vttp.Final.Project.Models.UpdateServiceRequest;
import sg.com.vttp.Final.Project.Models.UpdateServiceRequestStatus;
import sg.com.vttp.Final.Project.Repositories.FixedPhotoRepository;
import sg.com.vttp.Final.Project.Services.FixedPhotoService;
import sg.com.vttp.Final.Project.Services.LoginService;
import sg.com.vttp.Final.Project.Services.RequestImageService;
import sg.com.vttp.Final.Project.Services.ServiceRequestService;

@Controller
@RequestMapping
@CrossOrigin
public class AdminController {

    @Autowired
    LoginService loginSvc;

    @Autowired
    RequestImageService reqImgSvc;

    @Autowired
    ServiceRequestService svcReqSvc;

    @Autowired
    FixedPhotoService fixedPhotoSvc;

    @PostMapping("/api/Login")
    @ResponseBody
    public ResponseEntity<String> processLogin(@RequestBody Login payload){

        System.out.println(">>>>>>PAYLOAD : "  + " USERNAME - " + payload.getUsername() + " PASSWORD - " +payload.getPassword() );
        List<Login> loginProcessResults = loginSvc.processLogin(payload.getUsername(), payload.getPassword());

        if (loginProcessResults.size()<=0 || loginProcessResults.size() > 1){
            return ResponseEntity
                .status(403)
                .body("Sorry, we couldn't find your account and/or your password is incorrect. Please double-check your login credentials and try again.");
        } else {
            System.out.println(loginProcessResults.get(0).getAdminPosition());
            return ResponseEntity.ok(loginProcessResults.get(0).getAdminPosition().toString());
                //  System.out.println("qwer>>>"+ l.getPassword()+l.getUsername()+l.getAdminPosition());
                // }
        }
    
        // try {
        //     loginSvc.createUserLoginDetails(payload);
  //     return ResponseEntity.ok("received");
        // } catch (Exception ex) {
        //     ex.printStackTrace();
        //     return ResponseEntity
        //         .status(400)
        //         .body("Error cannot save to MySql");
        // }
        //random
    }

    @PostMapping(path="/api/ImageUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> storeData(@RequestPart String requestID, @RequestPart MultipartFile photo) {

        System.out.println(">>> DIRECTLY FROM ANGULAR" + " | " + requestID +" | "+ photo);

        String url = reqImgSvc.postImage(requestID, photo);

		//String newsId = newsSvc.postNews(title, description, photo, tags); 

        JsonObject returnObj = Json.createObjectBuilder()
				.add("requestID", requestID)
                .add("imageURL", url)
				.build();

		return ResponseEntity.ok(returnObj.toString());
	}

    @PostMapping(path="/api/ResolvedImageUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> storeResolvedData(@RequestPart String requestID, @RequestPart MultipartFile photo) {

        System.out.println(">>> DIRECTLY FROM ANGULAR RESOLVED " + " | " + requestID +" | "+ photo);

        Integer fixedphotocount = fixedPhotoSvc.findSvcReqFixedPhotoCountByID(requestID);
        fixedphotocount += 1;
        System.out.println("NEW COUNT"+fixedphotocount);
        requestID = fixedphotocount + "fixed" + requestID;
        String url = reqImgSvc.postImage(requestID, photo);
        System.out.println("URL:"+url);

		//String newsId = newsSvc.postNews(title, description, photo, tags); 

        JsonObject returnObj = Json.createObjectBuilder()
				.add("requestID", requestID)
                .add("imageURL", url)
				.build();

		return ResponseEntity.ok(returnObj.toString());
	}

    




    /* @GetMapping("/Image/{requestID}}")
    @ResponseBody
    public ResponseEntity<byte[]> getPicture(@PathVariable String requestID) {

      String url = reqImgSvc.get(requestID);
      RequestImage data = opt.get();

       return ResponseEntity.status(200)
            .header("Content-Type", data.mediaType())
            .header("Cache-Control", "max-age=604800")
            .body(data.contents());
   } */


    

    // @GetMapping("api/retrieveLogin")
    // public ResponseEntity<String> retrieveLogin(){
        
    //     return null;
    // }
    // @GetMapping(path="/category/{category}")
    // @ResponseBody
    // public ResponseEntity<String> getCategory(@PathVariable String category) {

    //     List<JsonObject> products = prodSvc.getProductByCategory(category).stream()
    //         .map(Utils::toJson)
    //         .toList();

    //     return ResponseEntity.ok(Json.createArrayBuilder(products).build().toString());
    // }
    //random123


    @PostMapping(path="/api/ServiceRequest")
    @ResponseBody
    public ResponseEntity<String> postOrder(@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
		JsonObject json = reader.readObject();
		System.out.printf(">>> PAYLOAD: %s\n", json.toString());

        // /* {"request":"qqq","duedate":"2024-03-29","priority":2,"photo":"https://astronaut.sgp1.digitaloceanspaces.com/images/7e0241b1","requestID":"7e0241b1"} */
        ServiceRequest svcReq = new ServiceRequest();
        svcReq.setRequestID(json.getString("requestID"));
        svcReq.setRequest(json.getString("request"));
        svcReq.setDuedate(json.getString("duedate"));
        svcReq.setCompleteddate(json.getString("completeddate"));
        svcReq.setPriority(json.getInt("priority"));
        svcReq.setPhoto(json.getString("photo"));
        svcReq.setFixedphoto(json.getString("fixedphoto"));
        svcReq.setLocationaddress(json.getString("locationaddress"));
        svcReq.setAdminname(json.getString("adminname"));
        svcReq.setContractorname(json.getString("contractorname"));
        svcReq.setApprovalstatus(json.getString("approvalstatus"));
        svcReq.setRejectreason(json.getString("rejectreason"));
        
        
        svcReqSvc.insertSvcReq(svcReq);

        return ResponseEntity.ok().build();
    }
    
    
    @GetMapping(path="/api/RequestList")
    @ResponseBody
    public ResponseEntity<String> getAllRequests() {

        /* JsonArrayBuilder arrBuilder = Json.createArrayBuilder(svcReqSvc.findAllSvcReq());
        System.out.println(arrBuilder); */

        List<JsonObject> svcReqArray = svcReqSvc.findAllSvcReq().stream()
        .map(Utils::toJsonSvcReq)
        .toList();
        
        return ResponseEntity.ok(Json.createArrayBuilder(svcReqArray).build().toString());
    }

    // @PostMapping(path="/api/ProgressSubmission")
    // @ResponseBody
    // public ResponseEntity<String> postProgressionSubmission(@RequestBody String payload) {

    //     JsonReader reader = Json.createReader(new StringReader(payload));
	// 	JsonObject json = reader.readObject();
	// 	System.out.printf(">>> PAYLOAD: %s\n", json.toString());

    //     // /* {"request":"qqq","duedate":"2024-03-29","priority":2,"photo":"https://astronaut.sgp1.digitaloceanspaces.com/images/7e0241b1","requestID":"7e0241b1"} */

    //     ServiceRequest svcReq = new ServiceRequest();
    //     svcReq.setRequestID(json.getString("requestID"));
    //     svcReq.setRequest(json.getString("request"));
    //     svcReq.setDuedate(json.getString("duedate"));
    //     svcReq.setPriority(json.getInt("priority"));
    //     svcReq.setPhoto(json.getString("photo"));
    //     svcReq.setLocationaddress(json.getString("locationaddress"));
    //     svcReqSvc.insertSvcReq(svcReq);

    //     return ResponseEntity.ok("successful");
    // }

    @PostMapping(path="/api/UpdateServiceRequest")
	public ResponseEntity<String> updateSvcReq (@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
		JsonObject json = reader.readObject();
		System.out.printf(">>> PAYLOAD UPDATE: %s\n", json.toString());


        UpdateServiceRequest updSvcReq = new UpdateServiceRequest();
        updSvcReq.setRequestID(json.getString("requestID"));
        updSvcReq.setFixedphoto(json.getString("fixedphoto"));
        updSvcReq.setContractorname(json.getString("contractorname"));
        
        svcReqSvc.updateSvcReq(updSvcReq);

        return ResponseEntity.ok().build();
	}

    @PostMapping(path="/api/UpdateServiceRequestStatus")
	public ResponseEntity<String> updateSvcReqStatus (@RequestBody String payload) {

        JsonReader reader = Json.createReader(new StringReader(payload));
		JsonObject json = reader.readObject();
		System.out.printf(">>> PAYLOAD UPDATE: %s\n", json.toString());


        UpdateServiceRequestStatus updSvcReqStatus = new UpdateServiceRequestStatus();
        updSvcReqStatus.setRequestID(json.getString("requestID"));
        updSvcReqStatus.setApprovalstatus(json.getString("approvalstatus"));
        updSvcReqStatus.setRejectreason(json.getString("rejectreason"));
        
        svcReqSvc.updateSvcReqStatus(updSvcReqStatus);

        return ResponseEntity.ok().build();
	}



    @GetMapping(path="/api/RequestListByID/{requestID}")
	public ResponseEntity<String> sendTagAndCount(@PathVariable String requestID) {

        JsonObject svcReqJSON = svcReqSvc.toJSON(svcReqSvc.findAllSvcReqByID(requestID));
        
        return ResponseEntity.ok(Json.createObjectBuilder(svcReqJSON).build().toString());
        
	}

    @PostMapping(path="/api/SlackNotification")
    public ResponseEntity<String> slackNotif(@RequestBody String payload){

        JsonReader reader = Json.createReader(new StringReader(payload));
		JsonObject json = reader.readObject();
		System.out.printf(">>> PAYLOAD SLACK: %s\n", json.toString());

        String challenge = json.getString("challenge");

        System.out.println("Challenge:" + challenge);
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body(challenge);
    }

}
