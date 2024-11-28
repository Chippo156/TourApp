package org.tour.quanlytour.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "itineraries")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Itinerary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String day;
    @Column(length = 1000)
    String activities;
    String time;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "tour_id")
    Tour tour;
}
