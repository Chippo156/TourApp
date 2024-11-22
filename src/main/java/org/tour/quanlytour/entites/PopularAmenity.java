package org.tour.quanlytour.entites;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "popular_amenities")
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopularAmenity {
    @Id
    @Column(name = "amenity_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String amenityName;
    private String amenityIcon;
}
