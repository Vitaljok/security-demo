package my.vitaljok.securitydemo

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

import static org.hamcrest.Matchers.containsString
import static org.hamcrest.Matchers.startsWith
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc(secure = true)
class ApiControllerSpec extends Specification {

    @Autowired
    MockMvc mvc

    def "should get public message"() {
        expect:
            mvc.perform(get("/public"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("Public message"))
    }

    def "should get 401 for secured resources"() {
        expect:
            mvc.perform(get("/private")).andExpect(status().isUnauthorized())
            mvc.perform(get("/user")).andExpect(status().isUnauthorized())
            mvc.perform(get("/admin")).andExpect(status().isUnauthorized())
    }

    @WithMockUser
    def "should get 403 for non-authorized resources"() {
        expect:
            mvc.perform(get("/user")).andExpect(status().isForbidden())
            mvc.perform(get("/admin")).andExpect(status().isForbidden())
    }

    @WithMockUser(authorities = ['read:user'])
    def "should get user message"() {
        expect:
            mvc.perform(get("/user"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("User message"))
    }

    @WithMockUser(authorities = ['read:admin'])
    def "should get admin message"() {
        expect:
            mvc.perform(get("/admin"))
                    .andExpect(status().isOk())
                    .andExpect(content().string("Admin message"))
    }

    @WithMockUser(username = "test_user")
    def "should get private message"() {
        expect:
            mvc.perform(get("/private"))
                    .andExpect(status().isOk())
                    .andExpect(content().string(startsWith("Private message")))
                    .andExpect(content().string(containsString("test_user")))
    }
}
