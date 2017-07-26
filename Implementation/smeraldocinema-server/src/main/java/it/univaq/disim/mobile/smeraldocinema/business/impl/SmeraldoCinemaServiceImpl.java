package it.univaq.disim.mobile.smeraldocinema.business.impl;

import it.univaq.disim.mobile.smeraldocinema.business.SmeraldoCinemaService;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Booking;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Film;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Purchase;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Screening;
import it.univaq.disim.mobile.smeraldocinema.business.domain.Seat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import static javassist.CtMethod.ConstParameter.string;
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
        
        //Creo la data odierna anche nel formato yyyy-MM-dd
        Date now = new Date();
        String nowfrm = new SimpleDateFormat("yyyy-MM-dd").format(now);

        //Recupero il film
        Film film = filmRepository.findById(id);
        List<Screening> screenings = film.getScreenings();
        List<Screening> newscreenings = new ArrayList<>(screenings);
        int nscreenings = screenings.size();

        for (int i = 0; i < nscreenings; i++) {
            //Trasformo la data della proiezione corrente in una strina
            String scrfrm = new SimpleDateFormat("yyyy-MM-dd").format(screenings.get(i).getDay());
            if (nowfrm.compareTo(scrfrm) > 0) {
                //Rimuovo la proiezione non giornaliera o già avvenuta
                newscreenings.remove(screenings.get(i));
            }
        }
        film.setScreenings(newscreenings);
        return film;
        
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
      public Seat findByRowNumberTheater(String row, String col, Long the){
       return seatRepository.findByRowNumberTheater(row, col, the);
    }
    
    @Override
    public String createBookings(List<Booking> bookings) {
        //String code = Utility.generateCode();
        String code = "was";
        for (int i = 0; i < bookings.size() ;i++) {
            bookings.get(i).setCode(code);
            bookingRepository.save(bookings.get(i));
        }
        return code;
    }
    
    @Override
    public String createPurchases(List<Purchase> purchases) {
        String qrcode = Utility.generateQrCode();
        for (int i = 0; i < purchases.size() ;i++) {
            purchases.get(i).setQrCode(qrcode);
            purchaseRepository.save(purchases.get(i));
        }
        return qrcode;
    }
    
    @Override
    public boolean checkPurchases(List<Purchase> purchases) {
        for (Purchase purchase : purchases) {
            Long myseat = purchase.getId().getSeat().getId();
            List<Purchase> purchasesdb = purchaseRepository.findByIdSeat(myseat);
            List<Booking> bookingsdb = bookingRepository.findByIdSeat(myseat);
            for (int i = 0; i<purchasesdb.size() ;i++) {
                if (purchasesdb.get(i).getId().getScreening().getId() == (purchase.getId().getScreening().getId())) {
                    return false;
                }
            }
            for (Booking bookingdb : bookingsdb) {
                if (bookingdb.getId().getScreening().getId() == (purchase.getId().getScreening().getId())) {
                    return false;
                }
            }
        }
        return true;
    }
    
    @Override
    public boolean checkBookings(List<Booking> bookings) {
        for (Booking booking : bookings) {
            Long myseat = booking.getId().getSeat().getId();
            List<Purchase> purchasesdb = purchaseRepository.findByIdSeat(myseat);
            List<Booking> bookingsdb = bookingRepository.findByIdSeat(myseat);
            for (int i = 0; i<bookingsdb.size() ;i++) {
                if (bookingsdb.get(i).getId().getScreening().getId() == (booking.getId().getScreening().getId())) {
                    return false;
                }
            }
            for (Purchase purchasedb : purchasesdb) {
                if (purchasedb.getId().getScreening().getId() == (booking.getId().getScreening().getId())) {
                    return false;
                }
            }
        }
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
