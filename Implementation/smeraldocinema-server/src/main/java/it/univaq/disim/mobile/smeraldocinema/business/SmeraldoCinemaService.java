package it.univaq.disim.mobile.smeraldocinema.business;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Film;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Screening;
import java.util.List;

public interface SmeraldoCinemaService {

    List<Film> findAllDailyFilms();

    List<Film> findAllWeeklyFilms();

    List<Film> findAllComingSoonFilms();

    Film findFilm(Long id);

    List<Booking> findAllBookingsByScreeningId(Long id);

    List<Purchase> findAllPurchasesByScreeningId(Long id);

    boolean createBooking(Booking booking, String code);

    boolean createPurchase(Purchase purchase, String qrcode);
    
    boolean savePurchases(List<Purchase> purchases);

    List<Screening> findAllScreeningsByPkFilm (Long id);
    
    void cleanBookings ();
    
    void cleanPurchases ();
}
