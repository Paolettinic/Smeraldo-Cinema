package it.univaq.disim.mobile.smeraldocinema.business.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "theaters")
public class Theater implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theater_id")
    private Long id;

    @Column(name = "number", nullable = false)
    private int number;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @OneToMany(mappedBy = "theater")
    private Set<Screening> screenings = new HashSet<Screening>();

    @OneToMany(mappedBy = "theater")
    private Set<Seat> seats = new HashSet<Seat>();

    public Theater() {
    }

    public Theater(Long id, int number, int capacity) {
        this.id = id;
        this.number = number;
        this.capacity = capacity;
    }

    public Theater(Long id, int number, int capacity, Set<Screening> screenings) {
        this.id = id;
        this.number = number;
        this.capacity = capacity;
        this.screenings = screenings;
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

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Set<Screening> getScreenings() {
        return this.screenings;
    }

    public void setScreenings(Set<Screening> screenings) {
        this.screenings = screenings;
    }

    public Set<Seat> getSeats() {
        return this.seats;
    }

    public void setSeats(Set<Seat> seats) {
        this.seats = seats;
    }
}
