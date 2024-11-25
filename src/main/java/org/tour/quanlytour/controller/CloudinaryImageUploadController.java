package org.tour.quanlytour.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.tour.quanlytour.services.impl.CloudinaryService;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/cloudinary/upload")
@RequiredArgsConstructor
public class CloudinaryImageUploadController {
    private final CloudinaryService cloudinaryService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<String>> uploadImage(@RequestParam("files") List<MultipartFile> files){
        List<String> urls = cloudinaryService.upload(files);
        return ResponseEntity.ok().body(urls);
    }
}
