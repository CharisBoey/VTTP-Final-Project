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


	}

}
