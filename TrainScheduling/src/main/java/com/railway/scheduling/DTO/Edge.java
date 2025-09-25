package com.railway.scheduling.DTO;

import com.railway.scheduling.Data.Formulas;
import com.railway.scheduling.Entity.Track;
import lombok.Data;

import java.sql.Time;

@Data
public class Edge {
    private Track track;
    private String target;
    private Float weight;
    public Edge(String target,Track track, int priority, int deviationPenalty, boolean isOnList, float trackLength, Time waitingTime){
        this.track = track;
        this.weight = Formulas.weight(priority,deviationPenalty,isOnList,trackLength,track.getMaximumSpeed(),waitingTime);
        this.target = target;
    }
}
