package it.univaq.disim.mobile.smeraldocinema.web;

import it.univaq.disim.mobile.smeraldocinema.business.SmeraldoCinemaService;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import it.univaq.disim.mobile.smeraldocinema.business.impl.Utility;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/bookings")
public class BookingController {
    
    @Autowired
    private SmeraldoCinemaService service;
    
    @PostMapping("/create")
    public String createBookings (@RequestBody List<Booking> bookings) {
      
      String s = service.createBookings(bookings);
      System.out.println(s);
      return "{\"text\":\""+s+"\"}";
    }
    
    @PostMapping("/check")
    public boolean checkBookings (@RequestBody List<Booking> bookings){
        return service.checkBookings(bookings);
    }
    
    @GetMapping("/{id}")
    public List<Booking> findAllByScreeningId (@PathVariable(value = "id") Long id) {
        List<Booking> bookings = service.findAllBookingsByScreeningId(id);
        return bookings;
    }
}