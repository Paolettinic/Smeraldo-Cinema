package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Film;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmRepository extends JpaRepository<Film, Long> {
    
    /**
     *   Restituisce il film con l'id
     *   @param film_id id del film
     *   @return il film con film_id
    */
    Film findById (Long film_id);
    
    /**
     *   Restituisce la lista dei film con data precedente a quella di oggi
     *   @param today giorno corrente
     *   @return la lista dei film
    */
    List<Film> findByReleaseDateBefore (Date today);
    
    /**
     *   Restituisce la lista dei film in arrivo
     *   @param today giorno corrente
     *   @return la lista dei film in arrivo
    */
    List<Film> findByReleaseDateAfter (Date today);
    
}
