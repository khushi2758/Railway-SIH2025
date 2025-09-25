package com.railway.scheduling.Repository;

import com.railway.scheduling.Entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainRepository extends JpaRepository<Train,Long> {
}
