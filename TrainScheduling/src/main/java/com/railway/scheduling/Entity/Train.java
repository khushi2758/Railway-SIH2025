package com.railway.scheduling.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.sql.Time;

@Entity
public class Train {
    @Id
    private Long trainId;
    private Time departureTime;
    private Time starBlockTimeInterval;
    private Time endTimeCoverBlock;
}
