package com.railway.scheduling.Data;

import lombok.Data;

@Data
public class State {
    private int[] platformAvailableFrom;
    private int scheduleMask;
    private int totalDelay;
}
