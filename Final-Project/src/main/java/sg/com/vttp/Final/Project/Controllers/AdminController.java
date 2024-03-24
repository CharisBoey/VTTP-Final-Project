package sg.com.vttp.Final.Project.Controllers;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import sg.com.vttp.Final.Project.Utils;
import sg.com.vttp.Final.Project.Models.Login;
import sg.com.vttp.Final.Project.Models.RequestImage;
import sg.com.vttp.Final.Project.Models.ServiceRequest;
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
        svcReq.setPriority(json.getInt("priority"));
        svcReq.setPhoto(json.getString("photo"));
        svcReqSvc.insertSvcReq(svcReq);

        return ResponseEntity.ok("successful");
    }
    
    @GetMapping(path="/api/RequestList")
    @ResponseBody
    public ResponseEntity<String> getAllResquests() {

        /* JsonArrayBuilder arrBuilder = Json.createArrayBuilder(svcReqSvc.findAllSvcReq());
        System.out.println(arrBuilder); */

        List<JsonObject> svcReqArray = svcReqSvc.findAllSvcReq().stream()
        .map(Utils::toJsonSvcReq)
        .toList();
        
        return ResponseEntity.ok(Json.createArrayBuilder(svcReqArray).build().toString());
    }

}