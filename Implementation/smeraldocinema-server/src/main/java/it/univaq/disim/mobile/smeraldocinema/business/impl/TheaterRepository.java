package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Theater;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheaterRepository  extends JpaRepository<Theater, Long> {
    
    /**
     *   Restituisce la sala con l'id
     *   @param theater_id id della sala
     *   @return la sala con theater_id
    */
    Theater findById (Long theater_id);
    
}
