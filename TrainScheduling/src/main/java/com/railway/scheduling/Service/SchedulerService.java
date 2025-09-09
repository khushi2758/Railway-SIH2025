package com.railway.scheduling.Service;

import com.railway.scheduling.Data.Platform;
import com.railway.scheduling.Data.State;
import com.railway.scheduling.Data.Train;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SchedulerService {
    public int scheduleTrains(List<Train> trains, List<Platform> platforms){
        int numbersOfTrains = trains.size();
        int numberOfPlatform = platforms.size();

    }
}
