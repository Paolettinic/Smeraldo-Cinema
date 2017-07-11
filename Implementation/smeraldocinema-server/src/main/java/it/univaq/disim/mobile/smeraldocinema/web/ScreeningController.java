package it.univaq.disim.mobile.smeraldocinema.web;

import it.univaq.disim.mobile.smeraldocinema.business.SmeraldoCinemaService;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Screening;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/screenings")
public class ScreeningController {
    
    @Autowired
    private SmeraldoCinemaService service;
    
    @GetMapping("/{id}")
    public List<Screening> findAllByFilmId (@PathVariable(value = "id") Long id)  {
        List<Screening> screenings = service.findAllScreeningsByPkFilm(id);
        return screenings;
    }
}