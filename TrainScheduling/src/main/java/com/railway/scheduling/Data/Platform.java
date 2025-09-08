package com.railway.scheduling.Data;

public class Platform {
    private int id;
    private int trackAvailability; // 0 = empty, 1 = occupied
    private int trackHealth; // percentage
    private int availableFromTime; //in minute
}
