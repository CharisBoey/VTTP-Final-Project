package sg.com.vttp.Final.Project;

import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import sg.com.vttp.Final.Project.Models.FixedPhoto;
import sg.com.vttp.Final.Project.Models.Login;
import sg.com.vttp.Final.Project.Repositories.FixedPhotoRepository;
import sg.com.vttp.Final.Project.Services.ServiceRequestService;

@SpringBootApplication
public class FinalProjectApplication implements CommandLineRunner{

	@Autowired
    private JdbcTemplate template;

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
    ServiceRequestService svcReqSvc;

	@Autowired
    FixedPhotoRepository fixedPhotoRepo;

	public static void main(String[] args) {
		SpringApplication.run(FinalProjectApplication.class, args);
	}

	public static final String SQL_PROCESS_LOGIN = """
			SELECT * FROM login WHERE username=? AND password=SHA2(?,256);
		""";

	@Override
	public void run(String... args) throws Exception { 	

		// SqlRowSet rs = template.queryForRowSet(SQL_PROCESS_LOGIN, "Samantha", "SamanthaPW");
		// List<Login> results = new LinkedList<>();
		// while(rs.next()){
		// 	System.out.println(Utils.toLogin(rs));
		// }

		// JsonArrayBuilder arrBuilder = Json.createArrayBuilder(svcReqSvc.findAllSvcReq());
        // System.out.println(">>"+arrBuilder.toString());

		// Criteria criteria = Criteria.where("requestID").is("aaaaaaaaaaaaaaa");
        // Query query = Query.query(criteria);
        // List<Document> result_findByID_Document = mongoTemplate.find(query, Document.class,"servicerequestfixedcount");

		// Document d = result_findByID_Document.get(0);
        //     Integer fixedPhotoCount = d.getInteger("fixedphotocount");
        //     fixedPhotoCount += 1;
		// 	System.out.println("l"+fixedPhotoCount);
        //     FixedPhoto fixedphoto = new FixedPhoto();
        //     fixedphoto.setRequestID("aaaaaaaaaaaaaaa");
        //     fixedphoto.setFixedphotocount(fixedPhotoCount);
        //     fixedPhotoRepo.updateSvcReqFixedPhotoCount(fixedphoto);

		


	}

}
