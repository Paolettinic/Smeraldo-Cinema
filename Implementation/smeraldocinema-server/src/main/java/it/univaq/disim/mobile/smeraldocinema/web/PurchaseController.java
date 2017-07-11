package it.univaq.disim.mobile.smeraldocinema.web;

import it.univaq.disim.mobile.smeraldocinema.business.SmeraldoCinemaService;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import it.univaq.disim.mobile.smeraldocinema.business.impl.Utility;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/purchases")
public class PurchaseController {
    
    @Autowired
    private SmeraldoCinemaService service;
    
    @PostMapping("/create")
    public boolean createPurchases (@RequestBody List<Purchase> purchases) {
        String qrcode = Utility.generateQrCode();
        for(Purchase purchase : purchases) {
            service.createPurchase(purchase, qrcode);
        }
        return true;
    }
    
    @GetMapping("/{id}")
    public List<Purchase> findAllByScreeningId (@PathVariable(value = "id") Long id) {
        List<Purchase> purchases = service.findAllPurchasesByScreeningId(id);
        return purchases;
    }
}