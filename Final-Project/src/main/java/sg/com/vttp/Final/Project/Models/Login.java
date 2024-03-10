package sg.com.vttp.Final.Project.Models;

public class Login {
    //MAKE SURE CAN ONLY SET PASSWORD ONCE
    private String username;
    private String password;
    private Boolean adminPosition;
    
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAdminPosition() {
        return adminPosition;
    }

    public void setAdminPosition(Boolean adminPosition) {
        this.adminPosition = adminPosition;
    }

    public Login(String username, String password, Boolean adminPosition) {
        this.username = username;
        this.password = password;
        this.adminPosition = adminPosition;
    }

    public Login(){

    }
}
