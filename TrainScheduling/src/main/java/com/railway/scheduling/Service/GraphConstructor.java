package com.railway.scheduling.Service;

import com.railway.scheduling.DTO.Edge;
import com.railway.scheduling.Entity.Track;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GraphConstructor {
    @Autowired
    private TrackService trackService;
    public List<String> SortestPathUsingAstar(){
        Map<String,List<Edge>> graph = new HashMap<>();
        List<Track> tracks = trackService.getTracks();
    }
}
