package com.railway.scheduling.Controller;

import com.railway.scheduling.Service.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/platform")
public class ScheduleController {
    @Autowired
    private SchedulerService schedulerService;
}
