package sg.com.vttp.Final.Project.Models;

import org.springframework.data.annotation.Id;

public class ServiceRequest {

    @Id
    private String requestID;
    private String request;
    private String duedate;
    private String completeddate;
    private Integer priority;
    private String photo;
    private String fixedphoto;
    private String locationaddress;
    private String adminname;
    private String contractorname;
    private String approvalstatus;
    private String rejectreason;
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
    public String getCompleteddate() {
        return completeddate;
    }
    public void setCompleteddate(String completeddate) {
        this.completeddate = completeddate;
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
    public String getFixedphoto() {
        return fixedphoto;
    }
    public void setFixedphoto(String fixedphoto) {
        this.fixedphoto = fixedphoto;
    }
    public String getLocationaddress() {
        return locationaddress;
    }
    public void setLocationaddress(String locationaddress) {
        this.locationaddress = locationaddress;
    }
    public String getAdminname() {
        return adminname;
    }
    public void setAdminname(String adminname) {
        this.adminname = adminname;
    }
    public String getContractorname() {
        return contractorname;
    }
    public void setContractorname(String contractorname) {
        this.contractorname = contractorname;
    }
    public String getApprovalstatus() {
        return approvalstatus;
    }
    public void setApprovalstatus(String approvalstatus) {
        this.approvalstatus = approvalstatus;
    }
    public String getRejectreason() {
        return rejectreason;
    }
    public void setRejectreason(String rejectreason) {
        this.rejectreason = rejectreason;
    }
    public ServiceRequest(String requestID, String request, String duedate, String completeddate, Integer priority,
            String photo, String fixedphoto, String locationaddress, String adminname, String contractorname,
            String approvalstatus, String rejectreason) {
        this.requestID = requestID;
        this.request = request;
        this.duedate = duedate;
        this.completeddate = completeddate;
        this.priority = priority;
        this.photo = photo;
        this.fixedphoto = fixedphoto;
        this.locationaddress = locationaddress;
        this.adminname = adminname;
        this.contractorname = contractorname;
        this.approvalstatus = approvalstatus;
        this.rejectreason = rejectreason;
    }
    public ServiceRequest() {
    }

   
    
}
