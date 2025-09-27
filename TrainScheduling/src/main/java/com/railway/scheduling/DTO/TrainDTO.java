package com.railway.scheduling.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TrainDTO {
    private Long trainId;
    private String departureTime;
    private String startBlockTimeInterval;
    private String endTimeCoverBlock;
    private String trainLength;
    private String trainSpeed;
    private String priority;
    private String deviationPenalty;
    private String  isOnList;
    private String waitingTime;
}
