package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.SmeraldoCinemaService;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Film;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Screening;
import java.time.LocalDate;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class SmeraldoCinemaServiceImpl implements SmeraldoCinemaService {

    @Autowired
    private FilmRepository filmRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;
    
    @Autowired
    private ScreeningRepository screeningRepository;
    
    @Autowired
    private SeatRepository seatRepository;
    
    @Autowired
    private TheaterRepository theaterRepository;
    
    @Override
    public List<Film> findAllDailyFilms() {
        return filmRepository.findByReleaseDate (LocalDate.now());
    }

    @Override
    public List<Film> findAllWeeklyFilms() {
        return filmRepository.findByReleaseDateBefore(LocalDate.now());
    }

    @Override
    public List<Film> findAllComingSoonFilms() {
        return filmRepository.findByReleaseDateAfter(LocalDate.now());
    }

    @Override
    public Film findFilm(Long id) {
        return filmRepository.findById(id);
    }

    @Override
    public List<Booking> findAllBookingsByScreeningId(Long id) {
        return bookingRepository.findByIdScreening(id);
    }

    @Override
    public List<Purchase> findAllPurchasesByScreeningId(Long id) {
        return purchaseRepository.findByIdScreening(id);
    } 

    @Override
    public boolean createBooking(Booking booking, String code) {
        for (Booking booking_ext : booking.getId().getSeat().getBookings()){
            if (booking_ext.getId().getScreening().equals(booking.getId().getScreening()))
                return false;
        }
        for (Purchase purchase_ext : booking.getId().getSeat().getPurchases()){
            if (purchase_ext.getId().getScreening().equals(booking.getId().getScreening()))
                return false;
        }
        booking.setCode(code);
        bookingRepository.save(booking);
        return true;
    }

    @Override
    public boolean createPurchase(Purchase purchase, String qrcode) {
        for (Purchase purchase_ext : purchase.getId().getSeat().getPurchases()){
            if (purchase_ext.getId().getScreening().equals(purchase.getId().getScreening()))
                return false;
        }
        for (Booking booking_ext : purchase.getId().getSeat().getBookings()){
            if (booking_ext.getId().getScreening().equals(purchase.getId().getScreening()))
                return false;
        }
        purchase.setQr_Code(qrcode);
        purchaseRepository.save(purchase);
        return true;
    }

    @Override
    public void cleanBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        for (Booking booking : bookings) {
            if (booking.getId().getScreening().getDay().isBefore(LocalDate.now()))
              bookingRepository.delete(booking);
        } 
    }

    @Override
    public void cleanPurchases() {
        List<Purchase> purchases = purchaseRepository.findAll();
        for (Purchase purchase : purchases) {
            if(purchase.getId().getScreening().getDay().isBefore(LocalDate.now()))
                purchaseRepository.delete(purchase);  
        }
    }

    @Override
    public List<Screening> findAllScreeningsByPkFilm(Long id) {
        return screeningRepository.findByFilm(id);
    }
}
