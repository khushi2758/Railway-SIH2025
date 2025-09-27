package com.railway.scheduling.Service;

import com.railway.scheduling.Entity.Train;
import com.railway.scheduling.Repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Time;
import java.util.List;

public class TrainService {
    @Autowired
    private TrainRepository trainRepository;
    public String TrainRegistration(Long trainId, Time departureTime, Time starBlockTimeInterval, Time endTimeCoverBlock, Float trainLength, Float trainSpeed, Integer priority, Float deviationPenalty, Boolean isOnList, Time waitingTime){
        try{
            Train train = new Train();
            train.setTrainId(trainId);
        }
    }
}
