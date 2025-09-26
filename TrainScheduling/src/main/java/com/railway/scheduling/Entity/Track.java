package com.railway.scheduling.Entity;

import com.railway.scheduling.Data.TrackStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Track {
    @Id
    private Long trackID;
    private Float maximumSpeed;
//    @Autowired
//    private TrackStatus trackStatus;
}
