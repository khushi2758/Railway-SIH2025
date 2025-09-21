package com.railway.scheduling.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Track {
    @Id
    private Long trackID;
}
