package sg.com.vttp.Final.Project.Models;

public class UpdateServiceRequest {
    private String requestID;
    private String fixedphoto;
    private String contractorname;
    
    public String getRequestID() {
        return requestID;
    }
    public void setRequestID(String requestID) {
        this.requestID = requestID;
    }
    public String getFixedphoto() {
        return fixedphoto;
    }
    public void setFixedphoto(String fixedphoto) {
        this.fixedphoto = fixedphoto;
    }
    public String getContractorname() {
        return contractorname;
    }
    public void setContractorname(String contractorname) {
        this.contractorname = contractorname;
    }
    public UpdateServiceRequest(String requestID, String fixedphoto, String contractorname) {
        this.requestID = requestID;
        this.fixedphoto = fixedphoto;
        this.contractorname = contractorname;
    }
    public UpdateServiceRequest() {
    }
}
