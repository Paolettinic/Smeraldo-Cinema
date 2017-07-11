package it.univaq.disim.mobile.smeraldocinema.web;

import it.univaq.disim.mobile.smeraldocinema.business.SmeraldoCinemaService;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Film;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/films")
public class FilmController {
    
    @Autowired
    private SmeraldoCinemaService service;
    
    @RequestMapping("/daily")
    public List<Film> findAllDailyFilms () {
        List<Film> films = service.findAllDailyFilms();
        return films;
    }
    
    @RequestMapping("/weekly")
    public List<Film> findAllWeeklyFilms () {
        List<Film> films = service.findAllWeeklyFilms();
        return films;
    }
    
    @RequestMapping("/comingsoon")
    public List<Film> findAllComingSoonFilms () {
        List<Film> films = service.findAllComingSoonFilms();
        return films;
    }
    
    @GetMapping("/{id}")
    public Film findFilmById (@PathVariable(value = "id") Long id) {
        Film film = service.findFilm(id);
        return film;
    }
}
