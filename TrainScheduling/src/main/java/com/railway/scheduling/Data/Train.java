package com.railway.scheduling.Data;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data //add the data annotation from lombok to generate the getter, setter, toString(), equals(), hashCode() methods for all the attributes
@AllArgsConstructor //add the all argument constructor to make a constructor for every attribute
public class Train {
    private int id;
    private String type;
    private int speed;
    private int priority;
    private int currentLocation;
    private int arraivalTime;
    private int departureTime;
}
