package sg.com.vttp.Final.Project;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import sg.com.vttp.Final.Project.Models.Login;
import sg.com.vttp.Final.Project.Models.ServiceRequest;

public class Utils {
    //From Day22 workshop
    public static Login toLogin(SqlRowSet rs) {
        Login l = new Login();
            l.setUsername(rs.getString("username"));
            l.setPassword(rs.getString("password"));
            l.setAdminPosition(rs.getBoolean("adminposition"));
        return l;
    }

    public static JsonObject toJsonSvcReq(ServiceRequest svcReq) {
        return Json.createObjectBuilder()
        .add("requestID", svcReq.getRequestID())
        .add("request", svcReq.getRequest())
        .add("duedate", svcReq.getDuedate())
        .add("priority", svcReq.getPriority())
        .add("photo", svcReq.getPhoto())
        .build();
    }
}
