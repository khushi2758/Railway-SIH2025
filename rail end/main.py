import json
from datetime import datetime, timedelta
from path.algo.astar import AStarScheduler
from path.algo.multipath import MultiPathFinder
from path.safety.cacheLook import CacheManager
from path.safety.occupancy import OccupancyManager
from priority import PrioritySystem

class RailwaySchedulingSystem:
    def __init__(self):
        print("🚄 Railway Scheduling System")
        print("Initializing...")

        self.priority_system = PrioritySystem()
        self.multipath_finder = MultiPathFinder()
        self.astar_scheduler = AStarScheduler()
        self.cache_manager = CacheManager('cache.json')
        self.occupancy_manager = OccupancyManager()

        self.network = self.create_network()
        self.active_trains = {}
        self.simulation_time = datetime.now()
        self.occupancy_log = []
        self.reroute_log = []

        print("✅ System ready\n")

    def create_network(self):
        """Create railway network with more alternative routes"""
        return {
            "stations": {
                "DLI": {"name": "Delhi", "connections": ["JDP", "AGC", "MTJ"]},
                "JDP": {"name": "Jaipur", "connections": ["DLI", "FL"]},
                "AGC": {"name": "Agra", "connections": ["DLI", "CNB", "MTJ"]},
                "CNB": {"name": "Kanpur", "connections": ["AGC", "BSB"]},
                "BSB": {"name": "Varanasi", "connections": ["CNB"]},
                "MTJ": {"name": "Mathura", "connections": ["DLI", "AGC"]},
                "FL": {"name": "Phulera", "connections": ["JDP"]}
            },
            "tracks": {
                "DLI-JDP": {"length": 300, "speed": 130},
                "DLI-AGC": {"length": 200, "speed": 110},
                "DLI-MTJ": {"length": 150, "speed": 100},
                "AGC-CNB": {"length": 250, "speed": 120},
                "CNB-BSB": {"length": 300, "speed": 130},
                "MTJ-AGC": {"length": 60, "speed": 80},
                "JDP-FL": {"length": 150, "speed": 120},
                "JDP-DLI": {"length": 300, "speed": 130},
                "AGC-DLI": {"length": 200, "speed": 110},
                "MTJ-DLI": {"length": 150, "speed": 100},
                "CNB-AGC": {"length": 250, "speed": 120},
                "BSB-CNB": {"length": 300, "speed": 130},
                "AGC-MTJ": {"length": 60, "speed": 80},
                "FL-JDP": {"length": 150, "speed": 120}
            }
        }

    def schedule_train(self, train_data):
        """Schedule a train with occupancy tracking"""
        print(f"\n📅 Scheduling: {train_data['name']}")
        print(f"Route: {train_data['origin']} → {train_data['destination']}")

        all_paths = self.multipath_finder.find_all_paths(
            self.network, train_data['origin'], train_data['destination']
        )

        if not all_paths:
            print("❌ No paths found")
            return None

        print(f"Available paths: {len(all_paths)}")
        for i, path in enumerate(all_paths[:3]):          
            for i, path in enumerate(all_paths[:3]):  
                print(f"  Path {i+1}: {' → '.join(path)}")

        optimal_path = self.astar_scheduler.find_optimal_path(all_paths, train_data, self.network)

        if not optimal_path:
            print("❌ No optimal path")
            return None

        timing = self.calculate_timing(optimal_path, train_data)
        self.cache_manager.cache_paths(train_data['id'], all_paths)

        success = self.occupancy_manager.reserve_path(optimal_path, train_data['id'])

        if success:
            for i in range(len(optimal_path) - 1):
                track_id = f"{optimal_path[i]}-{optimal_path[i+1]}"
                segment_timing = timing[i]
                self.log_occupancy(track_id, train_data['id'], 'RESERVED', 
                                 segment_timing['departure'], segment_timing['arrival'])

            self.active_trains[train_data['id']] = {
                'train_data': train_data,
                'path': optimal_path,
                'timing': timing,
                'status': 'scheduled',
                'position': train_data['origin'],
                'segment': 0,
                'progress': 0
            }
            print(f"✅ Scheduled: {' → '.join(optimal_path)}")
            print(f"ETA: {timing[-1]['arrival'].strftime('%H:%M')}")
            return True

        print("❌ Scheduling failed")
        return False

    def calculate_timing(self, path, train_data):
        """Calculate timing for path segments"""
        timing = []
        current_time = self.simulation_time

        for i in range(len(path) - 1):
            station1, station2 = path[i], path[i + 1]
            track_key = f"{station1}-{station2}"

            if track_key in self.network['tracks']:
                track = self.network['tracks'][track_key]
                travel_time = timedelta(hours=track['length'] / train_data.get('speed', 100))

                timing.append({
                    'segment': track_key,
                    'from': station1,
                    'to': station2,
                    'departure': current_time,
                    'arrival': current_time + travel_time,
                    'travel_time': travel_time
                })

                current_time += travel_time + timedelta(minutes=2)                  
                current_time += travel_time + timedelta(minutes=2)  

        return timing

    def log_occupancy(self, track_id, train_id, action, start_time, end_time):
        """Log track occupancy events with timestamps"""
        log_entry = {
            'timestamp': self.simulation_time,
            'track_id': track_id,
            'train_id': train_id,
            'action': action,
            'start_time': start_time,
            'end_time': end_time
        }
        self.occupancy_log.append(log_entry)

        if action == 'OCCUPIED':
            print(f"   🕒 {self.simulation_time.strftime('%H:%M')} | Track {track_id} OCCUPIED by {train_id}")
            print(f"      Duration: {start_time.strftime('%H:%M')} to {end_time.strftime('%H:%M')}")
        elif action == 'RELEASED':
            print(f"   🕒 {self.simulation_time.strftime('%H:%M')} | Track {track_id} RELEASED by {train_id}")
        elif action == 'RESERVED':
            print(f"   🕒 {self.simulation_time.strftime('%H:%M')} | Track {track_id} RESERVED for {train_id}")

    def log_reroute(self, train_id, old_path, new_path, reason):
        """Log rerouting events"""
        reroute_entry = {
            'timestamp': self.simulation_time,
            'train_id': train_id,
            'old_path': old_path,
            'new_path': new_path,
            'reason': reason
        }
        self.reroute_log.append(reroute_entry)

        print(f"   🔄 {self.simulation_time.strftime('%H:%M')} | REROUTE: {train_id}")
        print(f"      From: {' → '.join(old_path)}")
        print(f"      To: {' → '.join(new_path)}")
        print(f"      Reason: {reason}")

    def simulate_time(self, minutes=15):
        """Advance simulation time with detailed tracking"""
        self.simulation_time += timedelta(minutes=minutes)
        print(f"\n⏰ Time: {self.simulation_time.strftime('%H:%M')}")

        for train_id, schedule in self.active_trains.items():
            if schedule['status'] == 'scheduled':
                if self.simulation_time >= schedule['timing'][0]['departure']:
                    schedule['status'] = 'running'
                    print(f"🚆 {train_id} departed {schedule['position']}")

            if schedule['status'] == 'running':
                current_segment = schedule['segment']
                if current_segment < len(schedule['timing']):
                    segment = schedule['timing'][current_segment]

                    if (self.simulation_time >= segment['departure'] and 
                        self.simulation_time <= segment['arrival']):
                        if not any(log['train_id'] == train_id and log['action'] == 'OCCUPIED' 
                                 for log in self.occupancy_log if log.get('track_id') == segment['segment']):
                            self.log_occupancy(segment['segment'], train_id, 'OCCUPIED',
                                             segment['departure'], segment['arrival'])

                    if self.simulation_time >= segment['arrival']:
                        self.log_occupancy(segment['segment'], train_id, 'RELEASED',
                                         segment['departure'], segment['arrival'])

                        schedule['segment'] += 1
                        schedule['position'] = segment['to']

                        if schedule['segment'] >= len(schedule['timing']):
                            schedule['status'] = 'completed'
                            print(f"✅ {train_id} reached {schedule['position']}")
                            self.occupancy_manager.release_path(train_id)
                        else:
                            print(f"🚆 {train_id} arrived at {schedule['position']}")

    def show_occupancy_status(self):
        """Show current track occupancy status"""
        print(f"\n🛤️  CURRENT TRACK OCCUPANCY at {self.simulation_time.strftime('%H:%M')}")
        print("=" * 50)

        active_occupancies = [log for log in self.occupancy_log 
                            if log.get('start_time') and log.get('end_time') and
                            log['start_time'] <= self.simulation_time <= log['end_time']
                            and log['action'] == 'OCCUPIED']

        if not active_occupancies:
            print("No tracks currently occupied")
            return

        for occupancy in active_occupancies:
            time_left = occupancy['end_time'] - self.simulation_time
            mins_left = int(time_left.total_seconds() / 60)
            print(f"📍 {occupancy['track_id']}: {occupancy['train_id']} (ends in {mins_left}min)")

    def show_reroute_history(self):
        """Show rerouting history"""
        if not self.reroute_log:
            print("\nNo rerouting events recorded")
            return

        print(f"\n🔄 REROUTING HISTORY")
        print("=" * 50)

        for reroute in self.reroute_log:
            print(f"🕒 {reroute['timestamp'].strftime('%H:%M')} | {reroute['train_id']}")
            print(f"   Reason: {reroute['reason']}")
            print(f"   Old: {' → '.join(reroute['old_path'])}")
            print(f"   New: {' → '.join(reroute['new_path'])}")
            print()

    def show_status(self):
        """Display current system status"""
        print(f"\n📊 STATUS at {self.simulation_time.strftime('%H:%M')}")
        print("-" * 40)

        running = completed = scheduled = 0
        for train_id, schedule in self.active_trains.items():
            train = schedule['train_data']
            status = schedule['status']

            if status == 'running':
                running += 1
                if schedule['segment'] < len(schedule['timing']):
                    segment = schedule['timing'][schedule['segment']]
                    progress = ((self.simulation_time - segment['departure']).total_seconds() / 
                              (segment['arrival'] - segment['departure']).total_seconds() * 100)
                    print(f"🚆 {train_id} → {segment['to']} ({progress:.0f}%)")
            elif status == 'completed':
                completed += 1
                print(f"✅ {train_id} - Completed")
            else:
                scheduled += 1
                dep_time = schedule['timing'][0]['departure'].strftime('%H:%M')
                print(f"⏳ {train_id} - Departs {dep_time}")

        print(f"\nSummary: {running} running, {scheduled} scheduled, {completed} completed")

    def handle_emergency(self, train_id, problem_location, reason="Track blockage"):
        """Handle emergency rerouting with enhanced logic"""
        print(f"\n🚨 EMERGENCY: {train_id} at {problem_location}")
        print(f"Reason: {reason}")

        if train_id not in self.active_trains:
            print("❌ Train not found")
            return False

        schedule = self.active_trains[train_id]
        old_path = schedule['path']
        current_position = schedule['position']

        print(f"Train current position: {current_position}")
        print(f"Current path: {' → '.join(old_path)}")

        safe_paths = self.cache_manager.get_safe_alternative_paths(train_id, [problem_location])

        print(f"Available safe paths: {len(safe_paths)}")
        for i, path in enumerate(safe_paths):
            print(f"  Safe path {i+1}: {' → '.join(path)}")

        if safe_paths:
            new_path = min(safe_paths, key=len)

            self.log_reroute(train_id, old_path, new_path, reason)

            self.occupancy_manager.release_path(train_id)

            if current_position in new_path:
                current_index = new_path.index(current_position)
                new_path_from_current = new_path[current_index:]

                schedule['path'] = new_path_from_current
                schedule['timing'] = self.calculate_timing(new_path_from_current, schedule['train_data'])
                schedule['segment'] = 0
                schedule['position'] = current_position

                self.occupancy_manager.reserve_path(new_path_from_current, train_id)

                for i in range(len(new_path_from_current) - 1):
                    track_id = f"{new_path_from_current[i]}-{new_path_from_current[i+1]}"
                    segment_timing = schedule['timing'][i]
                    self.log_occupancy(track_id, train_id, 'RESERVED', 
                                     segment_timing['departure'], segment_timing['arrival'])

                print(f"✅ Rerouting successful! New ETA: {schedule['timing'][-1]['arrival'].strftime('%H:%M')}")
                return True
            else:
                print("❌ Cannot reroute from current position")
                return False
        else:
            print("❌ No safe alternative routes available")
            cached_paths = self.cache_manager.get_cached_paths(train_id)
            print(f"All cached paths contain {problem_location}:")
            for path in cached_paths:
                print(f"  {' → '.join(path)}")
            return False

def main():
    system = RailwaySchedulingSystem()

    trains = [
        {"id": "12301", "name": "Rajdhani", "origin": "DLI", "destination": "BSB", "type": "SPECIAL", "speed": 130},
        {"id": "12431", "name": "Shatabdi", "origin": "DLI", "destination": "JDP", "type": "EXPRESS", "speed": 110},
        {"id": "14553", "name": "Goods", "origin": "DLI", "destination": "AGC", "type": "FREIGHT", "speed": 80},
    ]

    print("📋 SCHEDULING TRAINS")
    for train in trains:
        system.schedule_train(train)

    system.show_status()
    system.show_occupancy_status()

    print("\n🕒 SIMULATION STARTING")
    for i in range(4):      
        for i in range(4):  
            system.simulate_time(15)
            system.show_status()
            system.show_occupancy_status()

    print("\n🚨 EMERGENCY DEMO")
    print("Triggering emergency when train 12301 is at AGC...")
    system.handle_emergency("12301", "CNB", "Signal failure at Kanpur - rerouting via alternative route")

    print("\n🕒 CONTINUING SIMULATION AFTER REROUTE")
    for i in range(3):
        system.simulate_time(15)
        system.show_status()
        system.show_occupancy_status()

    print("\n📈 FINAL REPORTS")
    system.show_reroute_history()

    print("\n📊 OCCUPANCY SUMMARY")
    total_occupancies = len([log for log in system.occupancy_log if log.get('action') == 'OCCUPIED'])
    print(f"Total track occupancies: {total_occupancies}")
    print(f"Total rerouting events: {len(system.reroute_log)}")
    print(f"Final active trains: {len(system.active_trains)}")

if __name__ == "__main__":
    main()