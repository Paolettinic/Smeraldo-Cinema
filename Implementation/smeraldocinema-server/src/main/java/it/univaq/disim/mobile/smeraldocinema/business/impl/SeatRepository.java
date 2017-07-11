package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository  extends JpaRepository<Seat, Long> {
    
    /**
     *   Restituisce il posto con l'id
     *   @param seat_id id
     *   @return il posto con seat_id
    */
    Seat findById (Long seat_id);
    
}
