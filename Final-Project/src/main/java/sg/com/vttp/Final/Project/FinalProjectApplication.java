package sg.com.vttp.Final.Project;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import sg.com.vttp.Final.Project.Models.Login;

@SpringBootApplication
public class FinalProjectApplication implements CommandLineRunner{

	@Autowired
    private JdbcTemplate template;

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
		
	}

}
