package com.railway.scheduling.Service;

import com.railway.scheduling.DTO.Edge;
import com.railway.scheduling.DTO.Station;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class AstarAlgorithm {
    private final Map<String,Integer> heuristic = new HashMap<>();
    public List<String> aStar(Map<String,List<Edge>> graph,String start,String goal){
        PriorityQueue<Station> openList = new PriorityQueue<>();
        Map<String,String> gScore = new HashMap<>();
    }
}
