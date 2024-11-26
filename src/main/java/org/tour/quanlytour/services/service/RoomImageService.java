package org.tour.quanlytour.services.service;





import org.tour.quanlytour.dtos.request.RoomImageRequest;
import org.tour.quanlytour.entites.RoomImage;

import java.util.List;

public interface RoomImageService {

    RoomImage uploadImage(Long roomId, RoomImageRequest request);
    List<RoomImage> get(Long roomId);

    String fakeData();

}

