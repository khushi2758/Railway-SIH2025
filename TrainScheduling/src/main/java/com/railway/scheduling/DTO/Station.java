package com.railway.scheduling.DTO;

public class Station implements Comparable<Station>{
    private String name;
    private int g; //cost from start
    private int f; // g+h
    private Station parent;
    @Override
    public int compareTo(Station other) {
        return Integer.compare(this.f,other.f);
    }
}
