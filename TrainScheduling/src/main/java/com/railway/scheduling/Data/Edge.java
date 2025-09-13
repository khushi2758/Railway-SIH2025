package com.railway.scheduling.Data;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class Edge {
    private int dist;
    private boolean freeByTrain;
    private double delayTime;
    private int trackHealthOk;
    private double speed;
    private double totalWeight;
    private double baseCost;
    private double penalty;
    private double trainSpecificCost;

    public Edge(int dist, boolean freeByTrain, double delayTime, int trackHealthOk, double speed) {
        this.dist = dist;
        this.freeByTrain = freeByTrain;
        this.delayTime = delayTime;
        this.trackHealthOk = trackHealthOk;
        this.speed = speed;
        baseCost = dist/speed;
        int k = 1;
        penalty = k * delayTime;
        double alpha = 1.0;
        double bita = 1.0;
        trainSpecificCost = alpha * baseCost + bita;
        totalWeight = baseCost+penalty+trainSpecificCost;
    }
}
