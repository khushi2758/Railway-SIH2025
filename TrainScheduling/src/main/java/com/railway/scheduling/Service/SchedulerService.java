package com.railway.scheduling.Service;

import com.railway.scheduling.Data.Platform;
import com.railway.scheduling.Data.State;
import com.railway.scheduling.Data.Train;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

@Service
public class SchedulerService {
    public int scheduleTrains(List<Train> trains, List<Platform> platforms){
        int numberOfTrains = trains.size();
        int platformCount = platforms.size();
        PriorityQueue<State> queue = new PriorityQueue<>((s1,s2)-> Integer.compare(s1.getTotalDelay(),s2.getTotalDelay()));
    }
}
