package org.tour.quanlytour.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.Test;

public interface TestRepository extends JpaRepository<Test, Long> {
}
