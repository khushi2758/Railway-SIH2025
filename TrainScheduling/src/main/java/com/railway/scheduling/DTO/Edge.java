package com.railway.scheduling.DTO;

import com.railway.scheduling.Data.Formulas;
import com.railway.scheduling.Entity.Track;
import lombok.Data;

import java.sql.Time;

@Data
public class Edge {
    private Track track;
    private Float weight;
    public Edge(Track track, int priority, int deviationPenalty, boolean isOnList, float trackLength, Time waitingTime){
        this.track = track;
        this.weight = Formulas.weight(priority,deviationPenalty,isOnList,trackLength,track.getMaximumSpeed(),waitingTime);
    }
}
