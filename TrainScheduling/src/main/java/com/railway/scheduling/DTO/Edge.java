package com.railway.scheduling.DTO;

import com.railway.scheduling.Data.Formulas;
import com.railway.scheduling.Entity.Track;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Data
@NoArgsConstructor
public class Edge {
    private Track track;
    private Float weight;
    public Edge(Track track, int priority, float deviationPenalty, boolean isOnList, Time waitingTime){
        this.track = track;
        this.weight = Formulas.weight(priority,deviationPenalty,isOnList,track.getTrackLength(),track.getMaximumSpeed(),waitingTime);
    }
}
