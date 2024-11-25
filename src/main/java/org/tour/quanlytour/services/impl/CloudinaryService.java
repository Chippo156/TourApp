package org.tour.quanlytour.services.impl;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;
    public List<String> upload(List<MultipartFile> files){
        List<String> urls = new ArrayList<>();
        files.forEach(file -> {
            try {
                String url =  this.cloudinary.uploader().upload(file.getBytes(),
                                Map.of("public_id", UUID.randomUUID().toString()))
                        .get("url").toString();
                urls.add(url);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return urls;
    }
}
