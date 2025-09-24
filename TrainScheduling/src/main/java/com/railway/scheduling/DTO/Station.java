package com.railway.scheduling.DTO;

public class Station implements Comparable<Station>{
    private String name;
    private int g; //cost from start
    @Override
    public int compareTo(Station o) {
        return 0;
    }
}
