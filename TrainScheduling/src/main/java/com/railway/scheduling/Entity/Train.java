package com.railway.scheduling.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Time;

@Entity
@Data
@AllArgsConstructor
public class Train {
    @Id
    private Long trainId;
    private Time departureTime;
    private Time starBlockTimeInterval;
    private Time endTimeCoverBlock;
    private Float trainLength;
    private Float trainSpeed;
}
