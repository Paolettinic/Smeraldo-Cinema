package it.univaq.disim.mobile.smeraldocinema.business.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "seats")
public class Seat implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private Long id;

    @Column(name = "number", nullable = false)
    private int number;

    @Column(name = "row", nullable = false)
    private String row;

    @OneToMany(mappedBy = "id.seat")
    private Set<Booking> bookings = new HashSet<Booking>();

    @OneToMany(mappedBy = "id.seat")
    private Set<Purchase> purchases = new HashSet<Purchase>();

    @ManyToOne
    @JoinColumn(name = "theater_id", nullable = false)
    private Theater theater;

    public Seat() {
    }

    public Seat(Long id, int number, String row, Theater theater) {
        this.id = id;
        this.number = number;
        this.row = row;
        this.theater = theater;
    }

    public Seat(Long id, int number, String row, Theater theater, Set<Booking> bookings, Set<Purchase> purchases) {
        this.id = id;
        this.number = number;
        this.row = row;
        this.theater = theater;
        this.bookings = bookings;
        this.purchases = purchases;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row;
    }
    
    public Theater getTheater(){
        return theater;
    }
    
    public void setTheater(Theater theater){
        this.theater = theater;
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
