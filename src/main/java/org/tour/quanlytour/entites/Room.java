package org.tour.quanlytour.entites;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "rooms")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_type", nullable = false)
    private String roomType; // Loại phòng, ví dụ: Villa, Suite, Standard Room

    @Column(name = "description")
    private String description; // Mô tả về phòng (ví dụ: Private Pool, Lake View)

    @Column(name = "features")
    private String features; // Các tiện ích: Free WiFi, Free self-parking, Spa discount, etc.

    @Column(name = "sleeps", nullable = false)
    private Integer sleeps; // Số người có thể ở

    @Column(name = "area")
    private Double area; // Diện tích (m²)

    @Column(name = "beds")
    private String beds; // Loại và số lượng giường (e.g., 1 King Bed, 1 Double Sofa Bed)

    @Column(name = "price", nullable = false)
    private double price; // Giá phòng mỗi đêm
    private String imageUrl; // Link ảnh phòng

    @Column(name = "quantity", nullable = false)
    private int quantity; // Số lượng phòng
    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;
}
