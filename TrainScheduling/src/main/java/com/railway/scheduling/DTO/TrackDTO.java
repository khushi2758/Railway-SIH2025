package com.railway.scheduling.DTO;

import lombok.Data;

@Data
public class TrackDTO {
    private Long trackID;
    private Float maximumSpeed;
    private String SourceStation;
    private String DestinationStation;
}
