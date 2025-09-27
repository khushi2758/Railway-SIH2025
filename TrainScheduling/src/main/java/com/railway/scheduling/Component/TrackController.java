package com.railway.scheduling.Component;

import com.railway.scheduling.DTO.TrackDTO;
import com.railway.scheduling.Service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/track")
public class TrackController {
    @Autowired
    private TrackService trackDataInsertion;
    public ResponseEntity<Map<String,String>> TrackRegistration(@RequestBody TrackDTO trackDTO){
        long trackId = Long.parseLong(trackDTO.getTrackID());
        float maxSpeedAllowed = Float.parseFloat(trackDTO.getMaximumSpeed());
        String sourceStation = trackDTO.getSourceStation();
        String destinationStation = trackDTO.getDestinationStation();
        String res = trackDataInsertion.insertTrackData(trackId,maxSpeedAllowed,sourceStation,destinationStation);
        Map<String,String> map = Map.of("Result",res);
        return ResponseEntity.ok(map);
    }
}
