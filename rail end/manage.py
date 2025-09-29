import json
import time
from datetime import datetime

class SystemManager:
    def __init__(self, railway_system):
        self.railway_system = railway_system
        self.performance_metrics = {
            "scheduling_requests": 0,
            "emergency_handlings": 0,
            "average_response_time": 0,
            "success_rate": 1.0
        }

    def backup_system_state(self):
        """Backup current system state"""
        backup_data = {
            "timestamp": datetime.now().isoformat(),
            "cache_size": self.railway_system.cache_manager.get_cache_size(),
            "active_trains": self.railway_system.occupancy_manager.get_active_train_count(),
            "performance_metrics": self.performance_metrics
        }

        with open(f"backup_{int(time.time())}.json", 'w') as f:
            json.dump(backup_data, f, indent=2)

        print("✅ System state backed up successfully!")

    def performance_report(self):
        """Generate performance report"""
        print("\n📈 Performance Report:")
        for metric, value in self.performance_metrics.items():
            print(f"   - {metric.replace('_', ' ').title()}: {value}")

    def clear_cache(self):
        """Clear system cache"""
        self.railway_system.cache_manager.clear_cache()
        print("✅ Cache cleared successfully!")

    def system_health_check(self):
        """Perform system health check"""
        print("\n🏥 System Health Check:")

        cache_health = self.railway_system.cache_manager.health_check()
        print(f"   - Cache Health: {cache_health}")

        occupancy_health = self.railway_system.occupancy_manager.health_check()
        print(f"   - Occupancy Health: {occupancy_health}")

        network_health = len(self.railway_system.network['stations']) > 0
        print(f"   - Network Health: {'Healthy' if network_health else 'Issues'}")

        return all([cache_health, occupancy_health, network_health])

def main():
    from main import RailwaySchedulingSystem

    railway_system = RailwaySchedulingSystem()
    system_manager = SystemManager(railway_system)

    system_manager.system_health_check()
    system_manager.backup_system_state()
    system_manager.performance_report()

if __name__ == "__main__":
    main()