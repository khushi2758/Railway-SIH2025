package com.railway.scheduling.Service;

import com.railway.scheduling.DTO.Edge;
import com.railway.scheduling.DTO.Station;

import java.util.*;

public class AstarAlgorithm {
    private final Map<String,Float> heuristic = new HashMap<>();
    public List<String> aStar(Map<String,List<Edge>> graph,String start,String goal){
        PriorityQueue<Station> openList = new PriorityQueue<>();
        Map<String,Float> gScore = new HashMap<>();
        Set<String> closeSet = new HashSet<>();
        gScore.put(start,0.0F);
        openList.add(new Station(start,0,heuristic.get(start),null));
        while (!openList.isEmpty()){
            Station current = openList.poll();
            if(current.getName().equals(goal)){
                return reconstructPath(current);
            }
            closeSet.add(current.getName());
            for(Edge edge: graph.getOrDefault(current.getName(),new ArrayList<>())){
                if(closeSet.contains(edge.getTarget())) continue;
                float tentativeG = current.getG() + edge.getWeight();
                if(tentativeG< gScore.getOrDefault(edge.getTarget(),Float.MAX_VALUE)){
                    gScore.put(edge.getTarget(),tentativeG);
                    float f = tentativeG + heuristic.getOrDefault(edge.getTarget(),0.0F);
                    Station neighbor = new Station(edge.getTarget(), tentativeG,f,current);
                    openList.add(neighbor);
                }
            }
        }
        return Collections.emptyList();
    }
}
