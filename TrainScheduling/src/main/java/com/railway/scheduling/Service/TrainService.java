package com.railway.scheduling.Service;

import com.railway.scheduling.Entity.Train;
import com.railway.scheduling.Repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Time;
import java.util.List;

public class TrainService {
    @Autowired
    private TrainRepository trainRepository;
    public String TrainRegistration(Long trainId, Time departureTime, Time startBlockTimeInterval, Time endTimeCoverBlock, Float trainLength, Float trainSpeed, Integer priority, Float deviationPenalty, Boolean isOnList, Time waitingTime){
        try{
            Train train = new Train();
            train.setTrainId(trainId);
            train.setDepartureTime(departureTime);
            train.setStartBlockTimeInterval(startBlockTimeInterval);
            train.setEndTimeCoverBlock(endTimeCoverBlock);
            train.setTrainLength(trainLength);
            train.setTrainSpeed(trainSpeed);
            train.setPriority(priority);
            train.setDeviationPenalty(deviationPenalty);
            train.setIsOnList(isOnList);
            train.setWaitingTime(waitingTime);
            trainRepository.save(train);
            return "OK";
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
