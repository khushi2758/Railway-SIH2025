package com.railway.scheduling.Data;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class State {
    private int[] platformAvailableFrom;
    private int scheduleMask;
    private int totalDelay;
}
