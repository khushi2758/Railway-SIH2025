package com.railway.scheduling.DTO;

import com.railway.scheduling.Data.Train;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlatformRequest {
    private List<Train> trains;
    private int numPlatforms;
}
