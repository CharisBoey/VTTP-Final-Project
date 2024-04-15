package sg.com.vttp.Final.Project.Services;

import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sg.com.vttp.Final.Project.Models.FixedPhoto;
import sg.com.vttp.Final.Project.Repositories.FixedPhotoRepository;

@Service
public class FixedPhotoService {
    
    @Autowired
    FixedPhotoRepository fixedPhotoRepo;

    @Transactional(rollbackFor = FixedPhotoException.class)
    public Integer findSvcReqFixedPhotoCountByID(String requestID) throws FixedPhotoException{

        List<Document> result_findByID_Document = fixedPhotoRepo.findSvcReqFixedPhotoCountByID(requestID);

        try {
            //if first update... add to mongotemplate to keep track of count --> 1
            //return number 1
            if (result_findByID_Document.isEmpty()){
                System.out.println("EMPTY");
                FixedPhoto fixedphoto = new FixedPhoto();
                fixedphoto.setRequestID(requestID);
                fixedphoto.setFixedphotocount(1);
                fixedPhotoRepo.insertSvcReqFixedPhotoCount(fixedphoto);
                return 1;
            } else {
                //not first update, increase by 1
                Document d = result_findByID_Document.get(0);
                Integer fixedPhotoCount = d.getInteger("fixedphotocount");
                fixedPhotoCount += 1;
                FixedPhoto fixedphoto = new FixedPhoto();
                fixedphoto.setRequestID(requestID);
                fixedphoto.setFixedphotocount(fixedPhotoCount);
                fixedPhotoRepo.updateSvcReqFixedPhotoCount(fixedphoto);
                return fixedPhotoCount;
            }
            
        } catch (Exception e) {
			throw new FixedPhotoException(e.getMessage());

        }

    }

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
