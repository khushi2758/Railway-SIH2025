
from datetime import datetime, timedelta

class TwoBlockSystem:
    def __init__(self, block_length_km: float = 5.0):
        self.block_length_km = block_length_km
        self.block_occupancy = {}  
        self.track_blocks = {}     
        
    def initialize_track_blocks(self, track_id: str, track_length: float):
        
        num_blocks = max(1, int(track_length / self.block_length_km))
        blocks = [f"{track_id}_BLK_{i}" for i in range(num_blocks)]
        self.track_blocks[track_id] = blocks

        for block in blocks:
            self.block_occupancy[block] = None
        
        print(f"Track {track_id} divided into {num_blocks} blocks")
        return blocks
    
    def can_enter_block(self, train_id: str, block_id: str) -> bool:
        
        if block_id not in self.block_occupancy:
            return True  
        
        current_occupant = self.block_occupancy[block_id]

        if current_occupant is None:
            return True

        if isinstance(current_occupant, dict) and current_occupant.get("train_id") == train_id:
            return True

        print(f"Block {block_id} occupied by train {current_occupant}")
        return False
    
    def check_two_block_rule(self, train_id: str, track_id: str, position_km: float) -> bool:
        
        if track_id not in self.track_blocks:
            return True  
        
        blocks = self.track_blocks[track_id]
        current_block_index = self.get_block_index(position_km)

        blocks_checked = 0
        for i in range(1, 3):
            next_block_index = current_block_index + i
            if next_block_index < len(blocks):
                next_block_id = blocks[next_block_index]
                if not self.can_enter_block(train_id, next_block_id):
                    print(f"Two-Block Violation: Block {next_block_id} not clear")
                    return False
                blocks_checked += 1
        
        print(f"Two-Block Rule satisfied: {blocks_checked} blocks ahead clear")
        return True
    
    def get_block_index(self, position_km: float) -> int:
        
        return int(position_km / self.block_length_km)
    
    def occupy_block(self, train_id: str, track_id: str, position_km: float) -> bool:
        
        if track_id not in self.track_blocks:
            return False
        
        blocks = self.track_blocks[track_id]
        block_index = self.get_block_index(position_km)
        
        if block_index < len(blocks):
            block_id = blocks[block_index]

            if self.can_enter_block(train_id, block_id):

                self.vacate_other_blocks(train_id, track_id, block_id)

                self.block_occupancy[block_id] = {
                    "train_id": train_id,
                    "entry_time": datetime.now()
                }
                print(f"Train {train_id} occupied block {block_id}")
                return True
        
        return False
    
    def vacate_other_blocks(self, train_id: str, track_id: str, current_block_id: str):
        
        if track_id not in self.track_blocks:
            return
        
        for block_id in self.track_blocks[track_id]:
            occupant = self.block_occupancy.get(block_id)
            if (
                block_id != current_block_id
                and isinstance(occupant, dict)
                and occupant.get("train_id") == train_id
            ):
                self.block_occupancy[block_id] = None
                print(f"Train {train_id} vacated block {block_id}")
    
    def vacate_all_blocks(self, train_id: str):
        
        blocks_vacated = 0
        for block_id, occupant in self.block_occupancy.items():
            if isinstance(occupant, dict) and occupant.get("train_id") == train_id:
                self.block_occupancy[block_id] = None
                blocks_vacated += 1
        
        if blocks_vacated > 0:
            print(f"Train {train_id} vacated {blocks_vacated} blocks")
    
    def get_block_occupancy(self, track_id: str):
        
        if track_id not in self.track_blocks:
            return {}
        
        occupancy = {}
        for block_id in self.track_blocks[track_id]:
            occupancy[block_id] = self.block_occupancy.get(block_id)
        
        return occupancy
    
    def emergency_stop_required(self, train_id: str, track_id: str, position_km: float) -> bool:
        
        if not self.check_two_block_rule(train_id, track_id, position_km):
            print(f"EMERGENCY STOP REQUIRED for train {train_id}!")
            