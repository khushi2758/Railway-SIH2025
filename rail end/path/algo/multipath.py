
from collections import deque


class MultiPathFinder:
    def __init__(self, max_paths=20):  
        self.max_paths = max_paths
    
    def find_all_paths(self, network, start, end, max_depth=15):
        
        print(f"Searching paths: {start} → {end}")
        
        if start not in network.get("stations", {}):
            print(f"Start station '{start}' not found in network")
            return []
        
        if end not in network.get("stations", {}):
            print(f"End station '{end}' not found in network")
            return []
        
        all_paths = []
        queue = deque([([start], set([start]))])
        paths_found = 0
        
        while queue and paths_found < self.max_paths:
            current_path, visited = queue.popleft()
            current_station = current_path[-1]
            
            if current_station == end:
                all_paths.append(current_path)
                paths_found += 1
                print(f"   Found path {paths_found}: {' → '.join(current_path)}")
                continue
            
            if len(current_path) >= max_depth:
                continue

            current_station_data = network["stations"].get(current_station, {})
            connections = current_station_data.get("connections", [])
            
            if not connections:
                print(f"   Station {current_station} has no connections")
                continue
            
            for neighbor in connections:
                if neighbor not in visited:

                    track_key1 = f"{current_station}-{neighbor}"
                    track_key2 = f"{neighbor}-{current_station}"
                    
                    track_exists = (
                        track_key1 in network.get("tracks", {}) 
                        or track_key2 in network.get("tracks", {})
                    )
                    
                    if track_exists:
                        new_visited = visited.copy()
                        new_visited.add(neighbor)
                        new_path = current_path + [neighbor]
                        queue.append((new_path, new_visited))
                    else:
                        print(f"   No track between {current_station} and {neighbor}")
        
        print(f"Multipath search complete: Found {len(all_paths)} paths")
        return all_paths
    
    def find_direct_path(self, network, start, end):
        
        direct_track = f"{start}-{end}"
        reverse_track = f"{end}-{start}"
        
        if direct_track in network.get("tracks", {}):
            return [start, end]
        elif reverse_track in network.get("tracks", {}):
            return [start, end]
        
        return None
