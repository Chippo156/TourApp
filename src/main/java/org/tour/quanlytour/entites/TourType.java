package org.tour.quanlytour.entites;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tours_type")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String description;
}
