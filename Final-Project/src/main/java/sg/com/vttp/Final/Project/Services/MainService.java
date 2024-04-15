package sg.com.vttp.Final.Project.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MainService {

    @Autowired
    RequestImageService reqImgSvc;

    @Autowired
    FixedPhotoService fixedPhotoSvc;

    // @Transactional(rollbackFor = )
    // public String updateCountANDpostImage (String requestID, MultipartFile photo) {
    //     Integer fixedphotocount = fixedPhotoSvc.findSvcReqFixedPhotoCountByID(requestID);
    //     System.out.println("NEW COUNT"+fixedphotocount);
    //     requestID = fixedphotocount + "fixed" + requestID;
    //     String url = reqImgSvc.postImage(requestID, photo);
    //     System.out.println("URL: "+ url);
    //     return url;
    // }



    /* @Transactional(rollbackFor= BookingException.class)
	public void createBooking(Bookings booking) throws BookingException{
		Optional<User> opt = bookingsRepo.userExists(booking.getEmail());
		User user;

		if(opt.isEmpty()){
			user = new User(booking.getEmail(), booking.getName()); 
			bookingsRepo.newUser(user);
		}

		bookingsRepo.newBookings(booking);
	} */
}
