package com.railway.scheduling.Component;

import com.railway.scheduling.Service.TrainService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/train")
public class TrainController {
    private TrainService trainService;
}
