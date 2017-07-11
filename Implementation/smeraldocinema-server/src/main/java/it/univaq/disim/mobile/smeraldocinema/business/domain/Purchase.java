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
@Table(name = "purchases")
@AssociationOverrides({
    @AssociationOverride(name = "id.seat", joinColumns = @JoinColumn(name = "seat_id")),
    @AssociationOverride(name = "id.screening", joinColumns = @JoinColumn(name = "screening_id"))
})
public class Purchase implements java.io.Serializable {

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
    @Column(name = "purchase_id")
    private ScreeningSeatId id;

    @Column(name = "mail", nullable = false)
    private String mail;

    @Column(name = "qr_code", nullable = false)
    private String qr_code;

    public Purchase() {
    }

    public Purchase(ScreeningSeatId id, String mail, String qr_code) {
        this.id = id;
        this.mail = mail;
        this.qr_code = qr_code;
    }

    public ScreeningSeatId getId() {
        return id;
    }

    public void setId(ScreeningSeatId id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getQr_Code() {
        return qr_code;
    }

    public void setQr_Code(String qr_code) {
        this.qr_code = qr_code;
    }

}
