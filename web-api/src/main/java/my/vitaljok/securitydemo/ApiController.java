package my.vitaljok.securitydemo;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class ApiController {

    @RequestMapping(value = "/login")
    @ResponseBody
    public String login() {
        return "Login endpoint";
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
    public String createAdmin() {
        return "Admin message";
    }

    @RequestMapping(value = "/**")
    @ResponseBody
    public String anyRequest() {
        return "Any message";
    }


}
