package com.railway.scheduling.DTO;

import com.railway.scheduling.Entity.Track;

import java.sql.Time;

public class Edge {
    private Track track;
    private Float weight;
    public Edge(Track track, int priority, int deviationPenalty, boolean isOnList, float trackLength, float maximumSpeedAllowed, Time waitingTime){
        this.track = track;
        this.weight = formulas.weight(priority,deviationPenalty,isOnList,trackLength,track.getMaximumSpeed(),waitingTime);
    }
}
