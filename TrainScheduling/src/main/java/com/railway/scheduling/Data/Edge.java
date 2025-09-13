package com.railway.scheduling.Data;

public class Edge {
    int dist;
    boolean freeByTrain;
    double delayTime;
    int trackHealthOk;
    double speed;
    double totalWeight;
    double baseCost;
    double penalty;
    double trainSpecificCost;

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
