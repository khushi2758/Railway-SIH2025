package com.railway.scheduling.Service;

import com.railway.scheduling.Entity.Track;
import com.railway.scheduling.Repository.TrackRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackDataInsertion {
    private TrackRepository trackRepository;
    public String insertTrackData(long trackId, float maximumSpeed){
        try{
            if(trackRepository.existsById(trackId)){
                return "track exist already";
            }
            Track track = new Track();
            track.setTrackID(trackId);
            track.setMaximumSpeed(maximumSpeed);
        }
    }
}
