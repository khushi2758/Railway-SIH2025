import json
import os
from datetime import datetime

class CacheManager:
    def __init__(self, cache_file='cache.json'):
        self.cache_file = cache_file
        self.cache = self.load_cache()
    
    def load_cache(self):
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, 'r') as f:
                    return json.load(f)
            except:
                return self._create_default_cache()
        else:
            return self._create_default_cache()
    
    def _create_default_cache(self):
        return {
            "cached_paths": {},
            "last_updated": datetime.now().isoformat()
        }
    
    def save_cache(self):
        self.cache['last_updated'] = datetime.now().isoformat()
        with open(self.cache_file, 'w') as f:
            json.dump(self.cache, f, indent=2)
    
    def cache_paths(self, train_id, paths):
        self.cache['cached_paths'][train_id] = {
            'paths': paths,
            'cached_at': datetime.now().isoformat()
        }
        self.save_cache()
    
    def get_cached_paths(self, train_id):
        if train_id in self.cache['cached_paths']:
            return self.cache['cached_paths'][train_id]['paths']
        return []
    
    def get_safe_alternative_paths(self, train_id, problem_locations):
        """Get paths that avoid all problem locations"""
        cached_paths = self.get_cached_paths(train_id)
        safe_paths = []
        
        for path in cached_paths:
            # Check if path avoids ALL problem locations
            if not any(location in path for location in problem_locations):
                safe_paths.append(path)
        
        return safe_paths
    
    def clear_cache(self):
        self.cache = self._create_default_cache()
        self.save_cache()
    
    def get_cache_size(self):
        return len(self.cache['cached_paths'])
    
    def health_check(self):
        return "Healthy"