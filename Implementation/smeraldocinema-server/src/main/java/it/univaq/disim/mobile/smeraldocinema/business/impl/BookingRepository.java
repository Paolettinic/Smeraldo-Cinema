package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository  extends JpaRepository<Booking, Long> {
    
    /**
     *   Restituisce la prenotazione con l'id
     *   @param booking_id id della prenotazione
     *   @return la prenotazione con booking_id
    */
    Booking findById (Long booking_id);
    
    /**
     * Restituisce la lista di prenotazioni per una programmazione
     * @param screening_id
     * @return lista di prenotazioni
     */
    List<Booking> findByIdScreening (Long screening_id);
    
}
