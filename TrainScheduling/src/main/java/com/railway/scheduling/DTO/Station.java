package com.railway.scheduling.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Station implements Comparable<Station>{
    private String name;
    private float g; //cost from start
    private float f; // g+h
    private Station parent;
    @Override
    public int compareTo(Station other) {
        return Float.compare(this.f,other.f);
    }
}
