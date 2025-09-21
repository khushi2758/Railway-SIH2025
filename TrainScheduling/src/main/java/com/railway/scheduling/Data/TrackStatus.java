package com.railway.scheduling.Data;

import lombok.Data;

import java.sql.Time;

@Data
public class TrackStatus {
    private boolean occupancy;
    private Time freeTrack;
}
