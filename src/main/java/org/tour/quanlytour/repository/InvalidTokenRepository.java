package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.InvalidatedToken;

public interface InvalidTokenRepository extends JpaRepository<InvalidatedToken, String> {
}
