package com.railway.scheduling.Service;

import com.railway.scheduling.Data.Platform;
import com.railway.scheduling.Data.State;
import com.railway.scheduling.Data.Train;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SchedulerService {
    public int scheduleTrains(List<Train> trains, List<Platform> platforms){
        int numberOfTrains = trains.size();
        int platformCount = platforms.size();
        PriorityQueue<State> queue = new PriorityQueue<>((s1,s2)-> Integer.compare(s1.getTotalDelay(),s2.getTotalDelay()));
        Map<State, Integer> dp = new HashMap<>();
//      Initial state: all platform free, no trains scheduled
        int[] initialAvailable = new int[platformCount];
        Arrays.fill(initialAvailable,0);
        State initialState = new State(initialAvailable,0,0);
        queue.add(initialState);
    }
}
