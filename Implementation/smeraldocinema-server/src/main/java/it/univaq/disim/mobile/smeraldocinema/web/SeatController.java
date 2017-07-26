package it.univaq.disim.mobile.smeraldocinema.web;

import it.univaq.disim.mobile.smeraldocinema.business.SmeraldoCinemaService;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/seats")
public class SeatController {
  
  @Autowired
  private SmeraldoCinemaService service;
  
  @GetMapping("/{row}/{col}/{the}")
  public Seat findByRowNumberTheater (@PathVariable(value = "row") String row,@PathVariable(value = "col") String col,@PathVariable(value = "the") Long the) {
    Seat seat =	 service.findByRowNumberTheater(row,col,the) ;
    return seat;
  }
  
}
