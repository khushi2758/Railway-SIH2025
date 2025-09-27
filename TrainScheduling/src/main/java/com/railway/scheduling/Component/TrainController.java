package com.railway.scheduling.Component;

import com.railway.scheduling.DTO.TrainDTO;
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
        Long trainId = trainDTO.getTrainId();
        Time departureTime = trainDTO.getDepartureTime();
        Time startBlockTimeInterval = trainDTO.getStartBlockTimeInterval();
        Time endTimeCoverBlock = trainDTO.getEndTimeCoverBlock();
        Float trainLength = trainDTO.getTrainLength();
        Float trainSpeed =
        Integer priority =
        Float deviationPenalty =
        Boolean isOnList =
        Time waitingTime =
    }
}
