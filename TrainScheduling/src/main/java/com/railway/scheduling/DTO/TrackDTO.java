package com.railway.scheduling.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrackDTO {
    private Long trackID;
    private Float maximumSpeed;
    private String SourceStation;
    private String DestinationStation;
}
