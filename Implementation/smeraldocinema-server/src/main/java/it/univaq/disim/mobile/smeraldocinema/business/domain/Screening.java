package it.univaq.disim.mobile.smeraldocinema.business.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "screenings")
public class Screening implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "screening_id")
    private Long id;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "day", nullable = false)
    private Date day;

    @Column(name = "hour", nullable = false)
    private String hour;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "theater_id", nullable = false)
    private Theater theater;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = false)
    private Film film;
    
    @JsonIgnore
    @OneToMany(mappedBy = "id.screening")
    private Set<Booking> bookings = new HashSet<Booking>();

    @JsonIgnore
    @OneToMany(mappedBy = "id.screening")
    private Set<Purchase> purchases = new HashSet<Purchase>();
    
    public Screening() {
    }
    
    public Screening(Long id, Date day, String hour, Theater theater, Film film) {
        this.id = id;
        this.day = day;
        this.hour = hour;
        this.theater = theater;
        this.film = film;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public Theater getTheater(){
        return theater;
    }
    
    public void setTheater(Theater theater){
        this.theater = theater;
    }
    
    public Film getFilm(){
        return film;
    }
    
    public void setFilm(Film film){
        this.film = film;
    }
    public Date getDay() {
        return day;
    }

    public void setDay(Date day) {
        this.day = day;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public Set<Booking> getBookings() {
        return this.bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }

    public Set<Purchase> getPurchases() {
        return this.purchases;
    }

    public void setPurchases(Set<Purchase> purchases) {
        this.purchases = purchases;
    }
}
