package com.railway.scheduling.Data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class State {
    private int[] platformAvailableFrom;
    private int scheduleMask;
    private int totalDelay;
}
