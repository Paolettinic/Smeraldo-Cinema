package it.univaq.disim.mobile.smeraldocinema.business.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
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
@Table(name = "films")
public class Film implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "film_id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "director", nullable = false)
    private String director;

    @Column(name = "actor", nullable = true)
    private String actor;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "running_time", nullable = false)
    private int runningTime;

    @Column(name = "synopsis", nullable = false)
    private String synopsis;

    @Column(name = "poster", nullable = false)
    private String poster;

    @Column(name = "recognition", nullable = true)
    private String recognition;

    @Column(name = "trailer", nullable = true)
    private String trailer;

    @Column(name = "release_date", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date releaseDate;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "sale", nullable = false)
    private boolean sale;

    @OneToMany(mappedBy = "film")
    private Set<Screening> screenings = new HashSet<Screening>();

    public Film() {
    }

    public Film(Long id, String title, String director, String actor, String country, int runningTime, String synopsis, String poster, String recognition, String trailer, Date releaseDate, float price, boolean sale) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.actor = actor;
        this.country = country;
        this.runningTime = runningTime;
        this.synopsis = synopsis;
        this.poster = poster;
        this.recognition = recognition;
        this.trailer = trailer;
        this.releaseDate = releaseDate;
        this.price = price;
        this.sale = sale;
    }

    public Film(Long id, String title, String director, String actor, String country, int runningTime, String synopsis, String poster, String recognition, String trailer, Date releaseDate, float price, boolean sale, Set<Screening> screenings) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.actor = actor;
        this.country = country;
        this.runningTime = runningTime;
        this.synopsis = synopsis;
        this.poster = poster;
        this.recognition = recognition;
        this.trailer = trailer;
        this.releaseDate = releaseDate;
        this.price = price;
        this.sale = sale;
        this.screenings = screenings;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getRunningTime() {
        return runningTime;
    }

    public void setRunningTime(int running_time) {
        this.runningTime = running_time;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getRecognition() {
        return recognition;
    }

    public void setRecognition(String recognition) {
        this.recognition = recognition;
    }

    public String getTrailer() {
        return trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date release_date) {
        this.releaseDate = release_date;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Boolean getSale() {
        return sale;
    }

    public void setSale(Boolean sale) {
        this.sale = sale;
    }

    public Set<Screening> getScreenings() {
        return this.screenings;
    }

    public void setScreenings(Set<Screening> screenings) {
        this.screenings = screenings;
    }
}
