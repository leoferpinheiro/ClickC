package counter.clickc;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 *
 * @author leo
 */
@Controller
public class CounterController {
    private int counter=0;
    
    /**
    *method to increment counter
    **/
    synchronized void increment(){
        this.counter++;
    }
    
    /**
     * method to return the actual counter when the app is started on a device
     **/
    @MessageMapping("/get")
    @SendTo("/counter/count")
    public int getCounter(){
        return (this.counter);
    }
    
    /**
     * method to increment the counter
     **/
    @MessageMapping("/increment")
    @SendTo("/counter/count")
    public int clickCounter(){
        increment();
        return (this.counter);
    }
    
}