package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.entites.Category;
import org.tour.quanlytour.services.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<Category> createCategory(@RequestBody Category category){
        try{
            return new ApiResponse<>(200,"success",categoryService.createCategory(category));
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }

    @GetMapping
    public ApiResponse<List<Category>> getCategories(){
        try{
            return new ApiResponse<>(200,"success",categoryService.getAllCategories());
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }
}