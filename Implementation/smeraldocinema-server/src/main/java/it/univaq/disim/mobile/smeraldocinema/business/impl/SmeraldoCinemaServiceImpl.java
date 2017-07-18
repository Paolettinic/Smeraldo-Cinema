package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.SmeraldoCinemaService;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Film;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Screening;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

        //Creo la data odierna anche nel formato yyyy-MM-dd e hh-mm
        Date now = new Date();
        String nowfrm = new SimpleDateFormat("yyyy-MM-dd").format(now);
        String nowfrmhhmm = new SimpleDateFormat("HH:mm").format(now);

        //Recupero i film con la data minore rispetto a quella odierna 
        List<Film> films = filmRepository.findByReleaseDateBefore(now);

        //Creo una list dalla quale eliminerò, nel caso, i film
        List<Film> dailyfilms = new ArrayList<>(films);

        //Numero di film da gestire
        int nfilms = films.size();

        //Scorro i film per controllarne le proiezioni
        for (int i = 0; i < nfilms; i++) {
            Film film = films.get(i);
            //Prendo le proiezioni relative al film
            List<Screening> screenings = film.getScreenings();

            //Creo una list dalla quale eliminerò, nel caso, le proiezioni
            List<Screening> dailyscreenings = new ArrayList<>(screenings);

            int nscreenings = screenings.size();
            for (int j = 0; j < nscreenings; j++) {
                //Trasformo la data della proiezione corrente in una stringa yyyy-MM-dd
                String scrfrm = new SimpleDateFormat("yyyy-MM-dd").format(screenings.get(j).getDay());
                //Controllo se la proiezione avviene nel giorno corrente
                if (!(scrfrm.equals(nowfrm))) {
                    //Rimuovo la proiezione non giornaliera
                    dailyscreenings.remove(screenings.get(j));
                } else {
                    //Trasformo la data della proiezione corrente in una stringa hh-mm
                    String scrfrmhhmm = screenings.get(j).getHour();
                    //Controllo se la proiezione non è già avvenuta
                    if((nowfrmhhmm.compareTo(scrfrmhhmm)) > 0) {
                        dailyscreenings.remove(screenings.get(j));
                    }   
                }
            }
            //Se oggi il film non ha proiezioni, lo rimuovo
            if (dailyscreenings.isEmpty()) {
                dailyfilms.remove(film);
            } //Setto le proiezioni odierne
            else {
                film.setScreenings(dailyscreenings);
            }
        }
        return dailyfilms;
    }

    @Override
    public List<Film> findAllWeeklyFilms() {

        //Creo la data odierna anche nel formato yyyy-MM-dd
        Date now = new Date();
        String nowfrm = new SimpleDateFormat("yyyy-MM-dd").format(now);

        //Recupero i film con la data minore rispetto a quella odierna 
        List<Film> films = filmRepository.findByReleaseDateBefore(now);

        //Creo una list dalla quale eliminerò, nel caso, i film
        List<Film> weeklyfilms = new ArrayList<>(films);

        //Numero di film da gestire
        int nfilms = films.size();

        //Scorro i film per controllarne le proiezioni
        for (int i = 0; i < nfilms; i++) {
            //Creo un set nel quale inserire i giorni non duplicati
            Set<String> days = new HashSet<>();
            
            Film film = films.get(i);
            //Prendo le proiezioni relative al film
            List<Screening> screenings = film.getScreenings();

            //Creo una list dalla quale eliminerò, nel caso, le proiezioni
            List<Screening> dailyscreenings = new ArrayList<>(screenings);

            int nscreenings = screenings.size();
            for (int j = 0; j < nscreenings; j++) {
                //Trasformo la data della proiezione corrente in una strina
                String scrfrm = new SimpleDateFormat("yyyy-MM-dd").format(screenings.get(j).getDay());
                if ((days.contains(scrfrm)) || (nowfrm.compareTo(scrfrm)) > 0) {
                    //Rimuovo la proiezione non giornaliera o già avvenuta
                    dailyscreenings.remove(screenings.get(j));
                } else {
                    days.add(scrfrm);
                }
            }
            //Se oggi il film non ha proiezioni, lo rimuovo
            if (dailyscreenings.isEmpty()) {
                weeklyfilms.remove(film);
            } else { //Setto le proiezioni odierne
                film.setScreenings(dailyscreenings);
            }
        }
        return weeklyfilms;
        
    }

    @Override
    public List<Film> findAllComingSoonFilms() {
        Date now = new Date();
        return filmRepository.findByReleaseDateAfter(now);
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
        for (Booking booking_ext : booking.getId().getSeat().getBookings()) {
            if (booking_ext.getId().getScreening().equals(booking.getId().getScreening())) {
                return false;
            }
        }
        for (Purchase purchase_ext : booking.getId().getSeat().getPurchases()) {
            if (purchase_ext.getId().getScreening().equals(booking.getId().getScreening())) {
                return false;
            }
        }
        booking.setCode(code);
        bookingRepository.save(booking);
        return true;
    }
    
    public boolean savePurchases(List<Purchase> purchases){
      for(Purchase p : purchases){
	purchaseRepository.save(p);
      }
      return true;
    }
    
    @Override
    public boolean createPurchase(Purchase purchase, String qrcode) {
        for (Purchase purchase_ext : purchase.getId().getSeat().getPurchases()) {
            if (purchase_ext.getId().getScreening().equals(purchase.getId().getScreening())) {
                return false;
            }
        }
        for (Booking booking_ext : purchase.getId().getSeat().getBookings()) {
            if (booking_ext.getId().getScreening().equals(purchase.getId().getScreening())) {
                return false;
            }
        }
        purchase.setQrCode(qrcode);
        //purchaseRepository.save(purchase);
        return true;
    }

    @Override
    public void cleanBookings() {
        Date now = new Date();
        List<Booking> bookings = bookingRepository.findAll();
        for (Booking booking : bookings) {
            // if (booking.getId().getScreening().getDay().isBefore(now))
            bookingRepository.delete(booking);
        }
    }

    @Override
    public void cleanPurchases() {
        Date now = new Date();
        List<Purchase> purchases = purchaseRepository.findAll();
        for (Purchase purchase : purchases) {
            // if(purchase.getId().getScreening().getDay().isBefore(now))
            purchaseRepository.delete(purchase);
        }
    }

    @Override
    public List<Screening> findAllScreeningsByPkFilm(Long id) {
        return screeningRepository.findByFilm(id);
    }
}
