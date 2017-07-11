package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Screening;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreeningRepository extends JpaRepository<Screening, Long> {
    
    /**
     *   Restituisce la programmazione con l'id
     *   @param screening_id id della prenotazione
     *   @return la programmazione con screening_id
    */
    Screening findById (Long screening_id);
    
    /**
     * Restituisce la programmazione di un film
     * @param film_id
     * @return la programmazione di film_id
     */
    List<Screening> findByFilm (Long film_id);
    
}
