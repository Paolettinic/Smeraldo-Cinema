package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    @Query(value = "SELECT * FROM bookings WHERE screening_id = :id",nativeQuery = true)
    List<Booking> findByIdScreening (@Param("id")Long screening_id);
    
    /**
     * Restituisce la lista di prenotazioni per un posto
     * @param seat_id
     * @return lista di prenotazioni
     */
    @Query(value= "SELECT * FROM bookings WHERE seat_id = :id",nativeQuery = true)
    List<Booking> findByIdSeat (@Param("id")Long seat_id);
    
}
