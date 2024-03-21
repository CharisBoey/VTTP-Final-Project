package sg.com.vttp.Final.Project.Models;

public class ServiceRequest {
    private String requestID;
    private String request;
    private String duedate;
    private Integer priority;
    private String photo;
    
    public String getRequestID() {
        return requestID;
    }
    public void setRequestID(String requestID) {
        this.requestID = requestID;
    }
    public String getRequest() {
        return request;
    }
    public void setRequest(String request) {
        this.request = request;
    }
    public String getDuedate() {
        return duedate;
    }
    public void setDuedate(String duedate) {
        this.duedate = duedate;
    }
    public Integer getPriority() {
        return priority;
    }
    public void setPriority(Integer priority) {
        this.priority = priority;
    }
    public String getPhoto() {
        return photo;
    }
    public void setPhoto(String photo) {
        this.photo = photo;
    }
    public ServiceRequest(String requestID, String request, String duedate, Integer priority, String photo) {
        this.requestID = requestID;
        this.request = request;
        this.duedate = duedate;
        this.priority = priority;
        this.photo = photo;
    }
    public ServiceRequest() {
    }

    

}
