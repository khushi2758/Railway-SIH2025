package com.railway.scheduling.Service;

import com.railway.scheduling.Data.Platform;
import com.railway.scheduling.Data.Train;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchedulerService {
    public int scheduleTrains(List<Train> trains, List<Platform> platforms){
        int numberOfTrains = trains.size();
        int platformCount = platforms.size();
    }
}
