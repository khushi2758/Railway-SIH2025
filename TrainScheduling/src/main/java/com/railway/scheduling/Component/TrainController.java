package com.railway.scheduling.Component;

import com.railway.scheduling.DTO.TrainDTO;
import com.railway.scheduling.Entity.Train;
import com.railway.scheduling.Service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Time;
import java.util.Map;

@RestController
@RequestMapping("/train")
public class TrainController {
    @Autowired
    private TrainService trainService;
    public ResponseEntity<Map<String,String>> RegisterTrain(@RequestBody TrainDTO trainDTO){
        Long trainId = Long.parseLong(trainDTO.getTrainId());
        Time departureTime = Time.valueOf(trainDTO.getDepartureTime());
        Time startBlockTimeInterval = Time.valueOf(trainDTO.getStartBlockTimeInterval());
        Time endTimeCoverBlock = Time.valueOf(trainDTO.getEndTimeCoverBlock());
        Float trainLength = Float.parseFloat(trainDTO.getTrainLength());
        Float trainSpeed = Float.parseFloat(trainDTO.getTrainSpeed());
        Integer priority = Integer.parseInt(trainDTO.getPriority());
        Float deviationPenalty = Float.parseFloat(trainDTO.getDeviationPenalty());
        Boolean isOnList = Boolean.parseBoolean(trainDTO.getIsOnList());
        Time waitingTime = trainDTO.getWaitingTime();
    }
}
