package com.railway.scheduling.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Track {
    @Id
    private Long trackID;
    private Float maximumSpeed;
}
