
from datetime import datetime, timedelta

class OccupancyManager:
    def __init__(self):
        self.track_occupancy = {}  
        self.train_positions = {}  
        self.reserved_paths = {}   
        self.initialized_tracks = set()
    
    def reserve_path(self, path, train_id):
        
        if path is None:
            print(f"❌ Cannot reserve None path for train {train_id}")
            return False
            
        if len(path) < 2:
            print(f"❌ Invalid path length for train {train_id}")
            return False
            
        print(f"📝 Reserving path for train {train_id}")
        self.reserved_paths[train_id] = path

        for i in range(len(path) - 1):
            track_id = f"{path[i]}-{path[i+1]}"
            if track_id not in self.track_occupancy:
                self.track_occupancy[track_id] = []
            
            if train_id not in self.track_occupancy[track_id]:
                self.track_occupancy[track_id].append(train_id)
                print(f"   ✅ Reserved track: {track_id}")
        
        return True
    
    def reserve_path_with_timing(self, path, train_id, segment_timing=None):
        
        return self.reserve_path(path, train_id)
    
    def release_path(self, train_id):
        
        if train_id in self.reserved_paths:
            path = self.reserved_paths[train_id]

            for i in range(len(path) - 1):
                track_id = f"{path[i]}-{path[i+1]}"
                if track_id in self.track_occupancy and train_id in self.track_occupancy[track_id]:
                    self.track_occupancy[track_id].remove(train_id)

            del self.reserved_paths[train_id]
            print(f"✅ Released path for train {train_id}")
    
    def update_train_position(self, train_id, track_id, position_km):
        
        self.train_positions[train_id] = {
            'track_id': track_id,
            'position_km': position_km,
            'timestamp': datetime.now()
        }
        return True  
    
    def display_block_occupancy(self, track_id):
        
        if track_id in self.track_occupancy:
            trains = self.track_occupancy[track_id]
            status = f"Occupied by {', '.join(trains)}" if trains else "Free"
            print(f"   🛤️  {track_id}: {status}")
        else:
            print(f"   🛤️  {track_id}: Free")
    
    def get_active_train_count(self):
        
        return len(self.reserved_paths)
    
    def health_check(self):
        
        return "Healthy"