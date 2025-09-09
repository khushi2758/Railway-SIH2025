package com.railway.scheduling.Controller;

import com.railway.scheduling.DTO.PlatformRequest;
import com.railway.scheduling.Service.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/platform")
public class ScheduleController {
    @Autowired
    private SchedulerService schedulerService;
    @PostMapping("/assign")
    public int assignPlatforms(@RequestBody PlatformRequest platformRequest){
        return schedulerService.scheduleTrains(platformRequest.getTrains(),platformRequest.getNumPlatforms());
    }
}
