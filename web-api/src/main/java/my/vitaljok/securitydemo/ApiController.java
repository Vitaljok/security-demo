package my.vitaljok.securitydemo;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class ApiController {

    @RequestMapping(value = "/public")
    @ResponseBody
    public String getPublic() {
        return "Public message";
    }

    @RequestMapping(value = "/user", method = GET)
    @ResponseBody
    @PreAuthorize("hasAuthority('read:user')")
    public String getUser() {
        return "User message";
    }

    @RequestMapping(value = "/admin", method = GET)
    @ResponseBody
    @PreAuthorize("hasAuthority('read:admin')")
    public String getAdmin() {
        return "Admin message";
    }

    @RequestMapping(value = "/**")
    @ResponseBody
    public String getPrivate() {
        return "Private message";
    }
}
