
from enum import Enum

class TrainPriority(Enum):
    SPECIAL = 0.5      
    EXPRESS = 1.0
    LOCAL = 1.3        
    FREIGHT = 1.6      
    MAINTENANCE = 2.0  

class PrioritySystem:
    def __init__(self):
        self.priority_weights = {
            'SPECIAL': TrainPriority.SPECIAL.value,
            'EXPRESS': TrainPriority.EXPRESS.value,
            'LOCAL': TrainPriority.LOCAL.value,
            'FREIGHT': TrainPriority.FREIGHT.value,
            'MAINTENANCE': TrainPriority.MAINTENANCE.value
        }
    
    def get_priority_value(self, train_type):
        
        return self.priority_weights.get(train_type, TrainPriority.LOCAL.value)
    
    def resolve_conflict(self, train1, train2):
        
        priority1 = self.get_priority_value(train1['type'])
        priority2 = self.get_priority_value(train2['type'])
        
        if priority1 < priority2:
            return train1, train2  
        elif priority2 < priority1:
            return train2, train1  
        else:

            return self._tie_breaker(train1, train2)
    
    def _tie_breaker(self, train1, train2):
        

        factors1 = self._calculate_tie_factors(train1)
        factors2 = self._calculate_tie_factors(train2)
        
        return (train1, train2) if factors1 > factors2 else (train2, train1)
    
    def _calculate_tie_factors(self, train):
        
        score = 0

        if 'passenger_count' in train:
            score += train['passenger_count'] * 0.01

        if 'current_delay' in train:
            score += train['current_delay'] * 0.1
        
        return score
    
    def calculate_train_specific_cost(self, base_cost, train_type, is_deviation=False):
        
        alpha = self.get_priority_value(train_type)
        beta = 0.25 if is_deviation else 0.0
        
        return (alpha * base_cost) + beta