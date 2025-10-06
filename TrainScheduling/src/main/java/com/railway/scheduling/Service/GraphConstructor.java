package com.railway.scheduling.Service;

import com.railway.scheduling.DTO.Edge;
import com.railway.scheduling.Entity.Track;
import com.railway.scheduling.Entity.Train;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GraphConstructor {
    @Autowired
    private TrackService trackService;
    @Autowired
    private TrainService trainService;
    public Map<String,Float> heuristicGenerator(){
        return Map.of("A",2.1F,"B",3.2F);
    }
    public List<String> SortestPathUsingAstar(){
        Map<String,List<Edge>> graph = new HashMap<>();
        List<Track> tracks = trackService.getTracks();
        List<Train> trains = trainService.getTrains();
        for(int i=0;i<tracks.size();i++){
            Edge edge = new Edge(tracks.get(i),trains.get(i).getPriority(),trains.get(i).getDeviationPenalty(),trains.get(i).getIsOnList(),trains.get(i).getWaitingTime());
            graph.put(tracks.get(i).getSourceStation(), List.of(edge));
        }
    }
}
