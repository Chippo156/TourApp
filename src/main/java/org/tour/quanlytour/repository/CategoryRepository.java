package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tour.quanlytour.entites.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
