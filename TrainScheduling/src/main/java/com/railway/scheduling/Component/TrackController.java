package com.railway.scheduling.Component;

import com.railway.scheduling.Service.TrackDataInsertion;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/track")
public class TrackController {
    private TrackDataInsertion trackDataInsertion;
}
