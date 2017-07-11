package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

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
    List<Purchase> findByIdScreening (Long screening_id);
}