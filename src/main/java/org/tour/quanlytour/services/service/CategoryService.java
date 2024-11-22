package org.tour.quanlytour.services.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.tour.quanlytour.entites.Category;
import org.tour.quanlytour.repository.CategoryRepository;

import java.util.List;

public interface CategoryService {
    Category createCategory(Category categoryRequest);
    Category getCategory(Long id);
    List<Category> getAllCategories();
}
