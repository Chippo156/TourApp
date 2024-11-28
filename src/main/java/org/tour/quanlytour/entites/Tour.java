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
    @Column(name = "start_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    LocalDate endDate;
    @Column(name = "image_url")
    String imageUrl;
    String duration;
    double rating;
    @Column(name = "max_people")
    int maxPeople;
    String departure;
    double price;
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    List<Itinerary> itineraries;


}
