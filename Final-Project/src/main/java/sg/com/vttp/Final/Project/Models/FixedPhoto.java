package sg.com.vttp.Final.Project.Models;

import org.springframework.data.annotation.Id;

public class FixedPhoto {
    @Id
    private String requestID;
    private Integer fixedphotocount;

    
    public FixedPhoto(String requestID, Integer fixedphotocount) {
        this.requestID = requestID;
        this.fixedphotocount = fixedphotocount;
    }


    public String getRequestID() {
        return requestID;
    }


    public void setRequestID(String requestID) {
        this.requestID = requestID;
    }


    public Integer getFixedphotocount() {
        return fixedphotocount;
    }


    public void setFixedphotocount(Integer fixedphotocount) {
        this.fixedphotocount = fixedphotocount;
    }


    public FixedPhoto() {
    }
    
}
