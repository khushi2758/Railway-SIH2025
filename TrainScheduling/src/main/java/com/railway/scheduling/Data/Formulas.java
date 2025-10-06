package com.railway.scheduling.Data;

import java.sql.Time;
import java.util.concurrent.TimeUnit;

public final class Formulas {
    private Formulas(){}
    public static float baseCost(float trackLength,float maximumSpeedAllowed){
        return trackLength / maximumSpeedAllowed;
    }
    public static float penalty(Time waitingTime){
        long timeInSecond = TimeUnit.MILLISECONDS.toSeconds(waitingTime.getTime());
        long k = 1;
        return (float) (k * timeInSecond);
    }
    public static float trainSpecificCost(int priority,float deviationPenalty,boolean isOnList,float trackLength, float maximumSpeedAllowed){
        float alpha = (float) priority;
        float beta = deviationPenalty;
        float edgeOnList = (isOnList) ? 1 : 0;
        return ((alpha * baseCost(trackLength,maximumSpeedAllowed)) + (beta * edgeOnList));
    }
    public static float weight(int priority,float deviationPenalty,boolean isOnList,float trackLength,float maximumSpeedAllowed,Time waitingTime){
        return (baseCost(trackLength,maximumSpeedAllowed) + penalty(waitingTime) + trainSpecificCost(priority,deviationPenalty,isOnList,trackLength,maximumSpeedAllowed));
    }
    public static float endTime(Time startTime,float trackLength, float trainLength,float trainSpeed){
        float startTimeInSecond = (float) (TimeUnit.MILLISECONDS.toSeconds(startTime.getTime()));
        return (startTimeInSecond + ((trackLength + trainLength)/trainSpeed));
    }
}
