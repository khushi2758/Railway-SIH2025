package com.railway.scheduling.Repository;

import com.railway.scheduling.Entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track,Long> {
}
