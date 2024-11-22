package org.tour.quanlytour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.tour.quanlytour.entites.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    public boolean existsByRole(String role);
}
