package sg.com.vttp.Final.Project;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import sg.com.vttp.Final.Project.Models.Login;

public class Utils {
    //From Day22 workshop
    public static Login toLogin(SqlRowSet rs) {
        Login l = new Login();
            l.setUsername(rs.getString("username"));
            l.setPassword(rs.getString("password"));
            l.setAdminPosition(rs.getBoolean("adminposition"));
        return l;
    }

}
