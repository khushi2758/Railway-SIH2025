package com.railway.scheduling.Service;

import com.railway.scheduling.Entity.Track;
import com.railway.scheduling.Repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackService {
    @Autowired
    private TrackRepository trackRepository;
    public String insertTrackData(long trackId, float maximumSpeed){
        try{
            if(trackRepository.existsById(trackId)){
                return "track exist already";
            }
            Track track = new Track();
            track.setTrackID(trackId);
            track.setMaximumSpeed(maximumSpeed);
            trackRepository.save(track);
            return "OK";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "some thing went wrong";
        }
    }
    public List<Track> getTracks(){

    }
}
