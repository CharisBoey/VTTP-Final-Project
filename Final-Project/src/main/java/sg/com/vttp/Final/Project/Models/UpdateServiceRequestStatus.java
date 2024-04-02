package sg.com.vttp.Final.Project.Models;

public class UpdateServiceRequestStatus {
    private String requestID;
    private String approvalstatus;
    private String rejectreason;
    public String getRequestID() {
        return requestID;
    }
    public void setRequestID(String requestID) {
        this.requestID = requestID;
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
    public UpdateServiceRequestStatus(String requestID, String approvalstatus, String rejectreason) {
        this.requestID = requestID;
        this.approvalstatus = approvalstatus;
        this.rejectreason = rejectreason;
    }
    public UpdateServiceRequestStatus() {
    }
    
    
}
