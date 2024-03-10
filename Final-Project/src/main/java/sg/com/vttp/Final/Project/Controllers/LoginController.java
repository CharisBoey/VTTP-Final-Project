package sg.com.vttp.Final.Project.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sg.com.vttp.Final.Project.Models.Login;
import sg.com.vttp.Final.Project.Services.LoginService;

@Controller
@RequestMapping
@CrossOrigin
public class LoginController {

    @Autowired
    LoginService loginSvc;

    @PostMapping("api/login")
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
    }

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
    

}
