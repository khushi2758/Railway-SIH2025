
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from enum import Enum

class TrainPriority(Enum):
    SPECIAL = 0.5      
    EXPRESS = 1.0        
    LOCAL = 1.3        
    FREIGHT = 1.6      
    MAINTENANCE = 2.0  

class TrackType(Enum):
    BROAD_GAUGE = "broad_gauge"
    METER_GAUGE = "meter_gauge" 
    NARROW_GAUGE = "narrow_gauge"

class SignalSystem(Enum):
    ABSOLUTE_BLOCK = "absolute_block"
    AUTOMATIC_BLOCK = "automatic_block"
    CAB_SIGNALING = "cab_signaling"

@dataclass
class Coordinates:
    latitude: float
    longitude: float
    
    def distance_to(self, other: 'Coordinates') -> float:
        
        import math
        lat1, lon1 = math.radians(self.latitude), math.radians(self.longitude)
        lat2, lon2 = math.radians(other.latitude), math.radians(other.longitude)
        
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        
        return 6371 * c 

@dataclass
class Platform:
    platform_id: str
    length: float  
    can_handle_electric: bool
    can_handle_diesel: bool
    is_occupied: bool = False
    occupied_by: Optional[str] = None 
    current_train: Optional[str] = None
    
    def occupy(self, train_id: str) -> bool:
        if not self.is_occupied:
            self.is_occupied = True
            self.occupied_by = train_id
            self.current_train = train_id
            return True
        return False
    
    def vacate(self) -> bool:
        if self.is_occupied:
            self.is_occupied = False
            self.occupied_by = None
            self.current_train = None
            return True
        return False
    
    def can_accommodate(self, train_length: float, is_electric: bool) -> bool:
        if self.is_occupied:
            return False
        if is_electric and not self.can_handle_electric:
            return False
        if not is_electric and not self.can_handle_diesel:
            return False
        return self.length >= train_length

@dataclass
class Station:
    station_id: str
    name: str
    coordinates: Coordinates
    platforms: List[Platform]
    station_type: str 
    capacity: int  

    current_trains: List[str] = field(default_factory=list)  
    maintenance_schedule: Dict = field(default_factory=dict)  
    
    def add_train(self, train_id: str) -> bool:
        
        if len(self.current_trains) < self.capacity:
            self.current_trains.append(train_id)
            return True
        return False
    
    def remove_train(self, train_id: str) -> bool:
        
        if train_id in self.current_trains:
            self.current_trains.remove(train_id)
            return True
        return False
    
    def get_available_platform(self, train_length: float, is_electric: bool) -> Optional[Platform]:
        
        for platform in self.platforms:
            if platform.can_accommodate(train_length, is_electric):
                return platform
        return None
    
    def get_platform_by_id(self, platform_id: str) -> Optional[Platform]:
        
        for platform in self.platforms:
            if platform.platform_id == platform_id:
                return platform
        return None

@dataclass
class TrackSegment:
    segment_id: str
    length: float 
    gradient: float  
    speed_limit: float 
    is_electrified: bool
    maintenance_status: str  
    current_trains: List[str] = field(default_factory=list)  
    
    def add_train(self, train_id: str) -> bool:
        if train_id not in self.current_trains:
            self.current_trains.append(train_id)
            return True
        return False
    
    def remove_train(self, train_id: str) -> bool:
        if train_id in self.current_trains:
            self.current_trains.remove(train_id)
            return True
        return False
    
    def is_available(self) -> bool:
        return self.maintenance_status == 'operational'

@dataclass
class Track:
    track_id: str
    from_station: str
    to_station: str
    length: float 
    track_type: TrackType
    number_of_tracks: int 
    signaling_system: SignalSystem
    maximum_speed: float
    is_electrified: bool

    segments: List[TrackSegment] = field(default_factory=list)

    current_trains: Dict[str, float] = field(default_factory=dict) 
    scheduled_maintenance: List[Dict] = field(default_factory=list)
    
    def add_train(self, train_id: str, position: float = 0.0) -> bool:
        
        if train_id not in self.current_trains:
            self.current_trains[train_id] = position
            return True
        return False
    
    def update_train_position(self, train_id: str, new_position: float) -> bool:
        
        if train_id in self.current_trains:
            self.current_trains[train_id] = new_position
            return True
        return False
    
    def remove_train(self, train_id: str) -> bool:
        
        if train_id in self.current_trains:
            del self.current_trains[train_id]
            return True
        return False
    
    def calculate_base_cost(self, train_speed: float) -> float:
        
        effective_speed = min(train_speed, self.maximum_speed)
        return self.length / effective_speed if effective_speed > 0 else float('inf')
    
    def get_trains_ahead(self, position: float, direction: str) -> List[str]:
        
        ahead_trains = []
        for train_id, train_pos in self.current_trains.items():
            if ((direction == "forward" and train_pos > position) or
                (direction == "backward" and train_pos < position)):
                ahead_trains.append(train_id)
        return ahead_trains
    
    def create_segments(self, block_length_km=5.0):
        
        num_segments = max(1, int(self.length / block_length_km))
        self.segments = []
        
        for i in range(num_segments):
            segment_length = block_length_km if i < num_segments - 1 else self.length - (i * block_length_km)
            segment = TrackSegment(
                segment_id=f"{self.track_id}_SEG_{i}",
                length=segment_length,
                gradient=0.0,  # Simplified
                speed_limit=self.maximum_speed,
                is_electrified=self.is_electrified,
                maintenance_status='operational'
            )
            self.segments.append(segment)

@dataclass
class Train:
    train_id: str
    name: str
    train_type: str  # 'SPECIAL', 'EXPRESS', 'LOCAL', 'FREIGHT', 'MAINTENANCE'
    priority: TrainPriority
    maximum_speed: float  # km/h
    length: float  # in meters
    is_electric: bool
    passenger_capacity: int
    weight: float  # in tons

    current_position: Optional[str] = None  # station_id or track_id
    current_speed: float = 0
    status: str = 'scheduled'  # 'scheduled', 'running', 'delayed', 'breakdown', 'completed'

    schedule: List[Dict] = field(default_factory=list)  
    actual_timings: List[Dict] = field(default_factory=list)  

    breakdown_type: Optional[str] = None  # 'minor', 'major', 'critical'
    estimated_recovery_time: Optional[timedelta] = None
    
    def get_alpha_value(self) -> float:
        
        return self.priority.value
    
    def calculate_train_specific_cost(self, base_cost: float, is_deviation: bool) -> float:
        
        alpha = self.get_alpha_value()
        beta = 0.25 if is_deviation else 0.0  
        return (alpha * base_cost) + beta
    
    def report_breakdown(self, breakdown_type: str, recovery_time: timedelta):
        
        self.breakdown_type = breakdown_type
        self.estimated_recovery_time = recovery_time
        self.status = "breakdown"
        self.current_speed = 0
    
    def recover_from_breakdown(self):
        
        self.breakdown_type = None
        self.estimated_recovery_time = None
        self.status = "running"
    
    def update_position(self, new_position: str, speed: float = 0):
        
        self.current_position = new_position
        self.current_speed = speed
    
    def add_schedule_event(self, station_id: str, event_type: str, time: datetime):
        
        event = {
            'station_id': station_id,
            'event_type': event_type,
            'scheduled_time': time,
            'actual_time': None
        }
        self.schedule.append(event)
    
    def record_actual_time(self, station_id: str, event_type: str, actual_time: datetime):
        
        for event in self.schedule:
            if event['station_id'] == station_id and event['event_type'] == event_type:
                event['actual_time'] = actual_time
                break

@dataclass
class RailwayNetwork:
    
    stations: Dict[str, Station] = field(default_factory=dict)
    tracks: Dict[str, Track] = field(default_factory=dict)
    trains: Dict[str, Train] = field(default_factory=dict)
    adjacency_list: Dict[str, List[str]] = field(default_factory=dict)  
    
    def add_station(self, station: Station):
        
        self.stations[station.station_id] = station
        self.adjacency_list[station.station_id] = []
    
    def add_track(self, track: Track):
        
        self.tracks[track.track_id] = track

        if track.from_station in self.adjacency_list:
            self.adjacency_list[track.from_station].append(track.track_id)
        if track.to_station in self.adjacency_list:
            self.adjacency_list[track.to_station].append(track.track_id)
    
    def add_train(self, train: Train):
        
        self.trains[train.train_id] = train
    
    def get_connected_tracks(self, station_id: str) -> List[Track]:
        
        connected_tracks = []
        for track_id in self.adjacency_list.get(station_id, []):
            if track_id in self.tracks:
                connected_tracks.append(self.tracks[track_id])
        return connected_tracks
    
    def find_track_between(self, station1_id: str, station2_id: str) -> Optional[Track]:
        
        for track in self.tracks.values():
            if ((track.from_station == station1_id and track.to_station == station2_id) or
                (track.from_station == station2_id and track.to_station == station1_id)):
                return track
        return None
    
    def initialize_track_segments(self, block_length_km=5.0):
        
        for track in self.tracks.values():
            track.create_segments(block_length_km)