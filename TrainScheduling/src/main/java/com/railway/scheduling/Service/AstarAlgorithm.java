package com.railway.scheduling.Service;

import com.railway.scheduling.DTO.Edge;
import com.railway.scheduling.DTO.Station;

import java.util.*;

public class AstarAlgorithm {
    private final Map<String,Integer> heuristic = new HashMap<>();
    public List<String> aStar(Map<String,List<Edge>> graph,String start,String goal){
        PriorityQueue<Station> openList = new PriorityQueue<>();
        Map<String,Integer> gScore = new HashMap<>();
        Set<String> closeSet = new HashSet<>();
        gScore.put(start,0);
        openList.add(new Station(start,0,heuristic.get(start),null));
    }
}
