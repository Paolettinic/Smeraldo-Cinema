package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeatRepository  extends JpaRepository<Seat, Long> {
    
    /**
     *   Restituisce il posto con l'id
     *   @param seat_id id
     *   @return il posto con seat_id
    */
    Seat findById (Long seat_id);
    
    /**
     *   Restituisce il posto con la riga e il numero
     *   @param row String
     *   @param num String
     *	 @param the Long
     *   @return il posto con seat_id
    */
    @Query(value = "SELECT * FROM seats WHERE row = :row AND number = :number AND theater_id = :theater",nativeQuery = true)
    Seat findByRowNumberTheater(@Param("row")String row,@Param("number") String num,@Param("theater") Long the);
    
}
