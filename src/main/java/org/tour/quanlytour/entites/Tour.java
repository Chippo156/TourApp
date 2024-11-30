package org.tour.quanlytour.entites;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tours")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    @Column(length = 1000)
    String description;
    @Column(length = 500)
    String highlight;
    @Column(name = "schedule")
    String schedule;
    @Column(name = "image_url")
    String imageUrl;
    String duration;
    double rating;
    String departure;
    double price;
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    List<Itinerary> itineraries;
    @ManyToOne
    @JoinColumn(name = "tour_type_id")
    TourType tourType;
}
