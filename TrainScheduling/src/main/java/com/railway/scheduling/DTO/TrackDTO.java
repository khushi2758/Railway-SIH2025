package com.railway.scheduling.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TrackDTO {
    private Long trackID;
    private Float maximumSpeed;
    private String SourceStation;
    private String DestinationStation;
}
