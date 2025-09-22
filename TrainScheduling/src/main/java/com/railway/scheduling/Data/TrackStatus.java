package com.railway.scheduling.Data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrackStatus {
    private boolean occupancy;
    private Time freeTrack;
}
