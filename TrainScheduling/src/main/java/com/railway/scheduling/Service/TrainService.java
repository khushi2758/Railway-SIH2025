package com.railway.scheduling.Service;

import com.railway.scheduling.Repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class TrainService {
    @Autowired
    private TrainRepository trainRepository;
}
