package com.railway.scheduling.Controller;

import com.railway.scheduling.DTO.PlatformRequest;
import com.railway.scheduling.Service.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/platform")
public class ScheduleController {
    @Autowired
    private SchedulerService schedulerService;
    @PostMapping("/assign")
    public ResponseEntity<Map<String,String>> assignPlatforms(@RequestBody PlatformRequest platformRequest){
        int res = schedulerService.scheduleTrains(platformRequest.getTrains(),platformRequest.getNumPlatforms());
        return ResponseEntity.ok(Map.of("toal delay",String.valueOf(res)));
    }
}
