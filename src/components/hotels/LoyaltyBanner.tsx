
import React from 'react';
import { Star, Gift, Award, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';

const LoyaltyBanner: React.FC = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  
  // Membership levels 
  const levels = [
    { name: "Bronze", points: 0, color: "bg-amber-700" },
    { name: "Silver", points: 100, color: "bg-stone-400" },
    { name: "Gold", points: 500, color: "bg-amber-400" },
    { name: "Platinum", points: 1000, color: "bg-blue-600" }
  ];
  
  // User's current points (mock data)
  const userPoints = isLoggedIn ? 350 : 0;
  
  // Calculate current level
  const getCurrentLevel = () => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (userPoints >= levels[i].points) {
        return levels[i];
      }
    }
    return levels[0];
  };
  
  // Calculate next level
  const getNextLevel = () => {
    const currentLevelIndex = levels.findIndex(level => level.name === getCurrentLevel().name);
    if (currentLevelIndex < levels.length - 1) {
      return levels[currentLevelIndex + 1];
    }
    return null;
  };
  
  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  
  // Calculate progress percentage towards next level
  const calculateProgress = () => {
    if (!nextLevel) return 100;
    
    const pointsInCurrentLevel = userPoints - currentLevel.points;
    const pointsToNextLevel = nextLevel.points - currentLevel.points;
    
    return Math.round((pointsInCurrentLevel / pointsToNextLevel) * 100);
  };
  
  if (!isLoggedIn) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold mb-1">Join MountAbu Rewards</h3>
            <p className="text-sm text-blue-100">Sign up to earn points and get exclusive deals</p>
          </div>
          <Button variant="secondary">Sign Up Now</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-blue-100 p-4 rounded-lg mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="flex items-center mb-3 md:mb-0">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentLevel.color} text-white mr-3`}>
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">{currentLevel.name} Member</h3>
            <p className="text-sm text-stone-500">{userPoints} points</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Gift className="h-4 w-4" />
            <span>Rewards</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Star className="h-4 w-4" />
            <span>Benefits</span>
          </Button>
        </div>
      </div>
      
      {nextLevel && (
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span>{currentLevel.name}</span>
            <span>{nextLevel.name} ({nextLevel.points - userPoints} points needed)</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
        <div className="flex items-center">
          <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
          <span>Free room upgrades</span>
        </div>
        <div className="flex items-center">
          <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
          <span>Late checkout</span>
        </div>
        <div className="flex items-center">
          <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
          <span>Exclusive member rates</span>
        </div>
        <div className="flex items-center">
          <Check className="h-3.5 w-3.5 text-green-500 mr-1.5" />
          <span>Priority customer service</span>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyBanner;
