package sg.com.vttp.Final.Project.Repositories;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import sg.com.vttp.Final.Project.Utils;
import sg.com.vttp.Final.Project.Models.Login;

@Repository
public class LoginRepository {

    @Autowired
    private JdbcTemplate template;

    
    public static final String SQL_PROCESS_LOGIN = """
        SELECT * FROM login WHERE username=? AND password=SHA2(?,256);
    """;

    public List<Login> processLogin(String username, String password){
        SqlRowSet rs = template.queryForRowSet(SQL_PROCESS_LOGIN, username, password);
        List<Login> results = new LinkedList<>();
        while(rs.next()){
            results.add(Utils.toLogin(rs));
        }
        return results;
    }

}
