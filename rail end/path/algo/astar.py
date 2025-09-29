
import heapq
from priority import PrioritySystem
import random
from typing import List, Dict, Any, Optional


class AStarScheduler:
    def __init__(self):
        self.priority_system = PrioritySystem()
    
    def find_optimal_path(self, all_paths: List[List[str]], train_data: Dict[str, Any], network: Dict[str, Any]) -> Optional[List[str]]:
        
        if not all_paths:
            print("No paths provided to A* scheduler")
            return None

        path_costs = []
        for path in all_paths:
            total_cost = self.calculate_path_cost(path, train_data, network)
            if total_cost is not None:
                path_costs.append((total_cost, path))
        
        if not path_costs:
            print("No valid paths after cost calculation")
            return None

        optimal_cost, optimal_path = min(path_costs, key=lambda x: x[0])
        print(f"A* selected path with cost: {optimal_cost:.2f} hours")
        return optimal_path
    
    def calculate_path_cost(self, path: List[str], train_data: Dict[str, Any], network: Dict[str, Any]) -> Optional[float]:
        
        if not path or len(path) < 2:
            return None
            
        total_cost = 0.0
        
        for i in range(len(path) - 1):
            station1 = path[i]
            station2 = path[i + 1]
            
            track_key1 = f"{station1}-{station2}"
            track_key2 = f"{station2}-{station1}"
            
            track_data = None
            if track_key1 in network.get("tracks", {}):
                track_data = network["tracks"][track_key1]
            elif track_key2 in network.get("tracks", {}):
                track_data = network["tracks"][track_key2]
            
            if track_data:

                train_speed = train_data.get("speed", 100)
                effective_speed = min(train_speed, track_data.get("speed", train_speed))
                base_cost = track_data.get("length", 0) / effective_speed

                train_specific_cost = self.priority_system.calculate_train_specific_cost(
                    base_cost, train_data.get("type", "passenger"), False
                )

                congestion_penalty = self.estimate_congestion_penalty(track_key1, network)

                segment_cost = base_cost + congestion_penalty + train_specific_cost
                total_cost += segment_cost
            else:
                print(f"Track not found between {station1} and {station2}")
                return None  
        return total_cost
    
    def estimate_congestion_penalty(self, track_id: str, network: Dict[str, Any]) -> float:
        

        return random.uniform(0, 0.1)  
