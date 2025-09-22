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
    public static float trainSpecificCost(int priority,int deviationPenalty,boolean isOnList){

    }
}
