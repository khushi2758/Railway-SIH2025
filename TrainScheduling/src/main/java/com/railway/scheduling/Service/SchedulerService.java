package com.railway.scheduling.Service;

import com.railway.scheduling.Data.Platform;
import com.railway.scheduling.Data.State;
import com.railway.scheduling.Data.Train;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.*;

@Service
public class SchedulerService {
    Map<String,Integer> memo = new HashMap<>();
    public int dp(List<Train>trains,int[]platformTimes,int trainIndex){
        if(trainIndex==trains.size()){
            return 0;
        }
        String key = trainIndex+Arrays.toString(platformTimes);
        if(memo.containsKey(key)){
            return memo.get(key);
        }
        Train train = trains.get(trainIndex);
        int minDelay = Integer.MAX_VALUE;
        for(int p=0;p<platformTimes.length;p++){
            int availableTime = platformTimes[p];
            int startTime = Math.max(availableTime,train.getArrivalTime());
            int waitTime = startTime - train.getArrivalTime();
            int[] newPlatFormTimes = Arrays.copyOf(platformTimes,platformTimes.length);
            newPlatFormTimes[p] = startTime+train.getDwellTime();
            int totalDelay = waitTime + dp(trains,newPlatFormTimes,trainIndex);
            minDelay = Math.min(minDelay,totalDelay);
        }
        memo.put(key,minDelay);
        return minDelay;
    }
    public int scheduleTrains(List<Train> trains, int platforms){
        int numbersOfTrains = trains.size();
        trains.sort((t1,t2)->{
            if(t1.getPriority()!=t2.getPriority()){
                return Integer.compare(t1.getPriority(),t2.getPriority());
            }
            return Integer.compare(t1.getArrivalTime(),t1.getArrivalTime());
        });
        int[] platformTimes = new int[platforms];
        return dp(trains,platformTimes,0);
    }
}
