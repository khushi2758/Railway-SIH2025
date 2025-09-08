package com.railway.scheduling.Data;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Platform {
    private int id;
    private int trackAvailability; // 0 = empty, 1 = occupied
    private int trackHealth; // percentage
    private int availableFromTime; //in minute
}
