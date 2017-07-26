package it.univaq.disim.mobile.smeraldocinema.business;

import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Film;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Screening;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Seat;

import java.util.List;

public interface SmeraldoCinemaService {

    List<Film> findAllDailyFilms();

    List<Film> findAllWeeklyFilms();

    List<Film> findAllComingSoonFilms();

    Film findFilm(Long id);

    List<Booking> findAllBookingsByScreeningId(Long id);

    List<Purchase> findAllPurchasesByScreeningId(Long id);
    
    String createPurchases(List<Purchase> purchases);
    
    String createBookings(List<Booking> bookings);
    
    boolean checkPurchases(List<Purchase> purchases);
    
    boolean checkBookings(List<Booking> bookings);

    List<Screening> findAllScreeningsByPkFilm (Long id);
    
    Seat findByRowNumberTheater(String row, String num, Long the);
    
    void cleanBookings ();
    
    void cleanPurchases ();
}
