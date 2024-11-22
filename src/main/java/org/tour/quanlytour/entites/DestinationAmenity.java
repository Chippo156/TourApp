package org.tour.quanlytour.entites;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "destination_amenities")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationAmenity {@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
Long id;
    @ManyToOne
    @JoinColumn(name = "destination_id")
    Destination destination;
    @ManyToOne
    @JoinColumn(name = "amenity_id")
    PopularAmenity amenity;
}
