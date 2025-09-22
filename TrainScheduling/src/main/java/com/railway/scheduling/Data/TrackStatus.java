package com.railway.scheduling.Data;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Time;

@Data
@AllArgsConstructor
public class TrackStatus {
    private boolean occupancy;
    private Time freeTrack;
}
