package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PurchaseRepository  extends JpaRepository<Purchase, Long>  {
    
    /**
     *   Restituisce l'acquisto con l'id
     *   @param purchase_id id dell'acquisto
     *   @return l'acquisto con purchase_id
    */
    Purchase findById (Long purchase_id);
    
    
   /**
     * Restituisce la lista di acquisti per una programmazione
     * @param screening_id
     * @return lista di acquisti
     */
    @Query(value = "SELECT * FROM purchases WHERE screening_id = :id",nativeQuery = true)
    List<Purchase> findByIdScreening (@Param("id")Long screening_id);
    
    
    /**
     * Restituisce la lista di acquisti per un posto
     * @param seat_id
     * @return lista di acquisti
     */
    @Query(value= "SELECT * FROM purchases WHERE seat_id = :id",nativeQuery = true)
    List<Purchase> findByIdSeat (@Param("id")Long seat_id);
}