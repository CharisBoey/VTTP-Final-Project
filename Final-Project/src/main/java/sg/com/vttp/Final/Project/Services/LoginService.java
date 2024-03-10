package sg.com.vttp.Final.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.com.vttp.Final.Project.Models.Login;
import sg.com.vttp.Final.Project.Repositories.LoginRepository;

@Service
public class LoginService {
    
    @Autowired
    LoginRepository loginRepo;
    
    // public void createUserLoginDetails(Login login) {
    //     loginRepo.createUserLoginDetails(login);
    // }

    public List<Login> processLogin (String username, String password){
        return loginRepo.processLogin(username, password);
    }

}
