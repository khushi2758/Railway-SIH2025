package com.railway.scheduling.Component;

import com.railway.scheduling.Service.TrackDataInsertion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/track")
public class TrackController {
    @Autowired
    private TrackDataInsertion trackDataInsertion;
    public ResponseEntity<Map<String,String>> TrackRegistration(@RequestParam String id, String maxSpeed){
        long trackId = Long.parseLong(id);
        float maxSpeedAllowed = Float.parseFloat(maxSpeed);
    }
}
