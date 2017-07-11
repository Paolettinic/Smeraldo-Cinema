package it.univaq.disim.mobile.smeraldocinema.business.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "bookings")
@AssociationOverrides({
    @AssociationOverride(name = "id.seat", joinColumns = @JoinColumn(name = "seat_id")),
    @AssociationOverride(name = "id.screening", joinColumns = @JoinColumn(name = "screening_id"))
})
public class Booking implements java.io.Serializable {

    @Embeddable
    public static class ScreeningSeatId implements java.io.Serializable {

        @ManyToOne
        private Screening screening;

        @ManyToOne
        private Seat seat;

        public Screening getScreening() {
            return screening;
        }

        public void setScreening(Screening screening) {
            this.screening = screening;
        }

        public Seat getSeat() {
            return seat;
        }
 
        public void setSeat(Seat seat) {
            this.seat = seat;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private ScreeningSeatId id;

    @Column(name = "code", nullable = false)
    private String code;

    public Booking() {
    }

    public Booking(ScreeningSeatId id, String code) {
        this.id = id;
        this.code = code;
    }

    public ScreeningSeatId getId() {
        return id;
    }

    public void setId(ScreeningSeatId id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
    
}
