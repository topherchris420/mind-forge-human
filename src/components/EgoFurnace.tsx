
import React, { useEffect, useState } from 'react';

const EgoFurnace = () => {
  const [egoLevel, setEgoLevel] = useState(0);
  const [visualStage, setVisualStage] = useState(1);

  useEffect(() => {
    // Calculate ego burning progress
    const calculateEgoBurn = () => {
      let burnScore = 0;
      
      // Daily resistance completions
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - i);
        const dateKey = checkDate.toDateString();
        if (localStorage.getItem(`offswitch-resistance-${dateKey}`)) {
          burnScore += 3;
        }
      }
      
      // CSI entries (humility metric)
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - i);
        const dateKey = checkDate.toDateString();
        if (localStorage.getItem(`offswitch-csi-${dateKey}`)) {
          burnScore += 1;
        }
      }
      
      return Math.min(burnScore, 100);
    };

    const score = calculateEgoBurn();
    setEgoLevel(score);
    
    // Visual stages based on ego burn level
    if (score < 20) setVisualStage(1); // Cracked stone
    else if (score < 40) setVisualStage(2); // Weathering begins
    else if (score < 60) setVisualStage(3); // Organic forms emerge
    else if (score < 80) setVisualStage(4); // Human features appear
    else setVisualStage(5); // Weathered wisdom face
  }, []);

  const getVisualElement = () => {
    switch (visualStage) {
      case 1:
        return (
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-full h-full bg-graphite rounded-sm transform rotate-12 opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-charcoal/30 rounded-sm transform rotate-12"></div>
            <div className="absolute top-2 left-4 w-8 h-0.5 bg-parchment transform -rotate-45"></div>
            <div className="absolute bottom-3 right-2 w-6 h-0.5 bg-parchment transform rotate-12"></div>
          </div>
        );
      case 2:
        return (
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-full h-full bg-graphite rounded-sm transform rotate-12 opacity-70"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-earth-brown/20 to-transparent rounded-sm transform rotate-12"></div>
            <div className="absolute top-2 left-4 w-8 h-0.5 bg-parchment transform -rotate-45"></div>
            <div className="absolute bottom-3 right-2 w-6 h-0.5 bg-parchment transform rotate-12"></div>
            <div className="absolute top-4 right-3 w-4 h-0.5 bg-earth-brown/40 transform rotate-45"></div>
          </div>
        );
      case 3:
        return (
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-full h-full bg-gradient-to-br from-graphite to-earth-brown rounded-lg transform rotate-12 opacity-60"></div>
            <div className="absolute inset-3 bg-gradient-to-br from-parchment/20 to-earth-brown/30 rounded-lg transform -rotate-6"></div>
            <div className="absolute top-6 left-8 w-2 h-2 bg-charcoal rounded-full"></div>
            <div className="absolute top-8 left-6 w-2 h-2 bg-charcoal rounded-full"></div>
          </div>
        );
      case 4:
        return (
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-full h-full bg-gradient-to-br from-earth-brown to-parchment-dark rounded-xl transform rotate-6 opacity-80"></div>
            <div className="absolute top-4 left-6 w-3 h-3 bg-charcoal rounded-full"></div>
            <div className="absolute top-4 right-6 w-3 h-3 bg-charcoal rounded-full"></div>
            <div className="absolute top-12 left-8 w-6 h-1 bg-graphite rounded-full"></div>
            <div className="absolute bottom-4 left-6 w-8 h-2 bg-earth-brown/60 rounded-full"></div>
          </div>
        );
      case 5:
        return (
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-full h-full bg-gradient-to-br from-parchment to-earth-brown rounded-2xl opacity-90"></div>
            <div className="absolute top-3 left-5 w-4 h-4 bg-charcoal rounded-full opacity-70"></div>
            <div className="absolute top-3 right-5 w-4 h-4 bg-charcoal rounded-full opacity-70"></div>
            <div className="absolute top-10 left-7 w-8 h-1 bg-graphite rounded-full"></div>
            <div className="absolute bottom-3 left-4 w-12 h-3 bg-earth-brown/80 rounded-full"></div>
            <div className="absolute top-6 left-8 w-6 h-8 bg-gradient-to-b from-transparent to-earth-brown/20 rounded-full"></div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStageDescription = () => {
    switch (visualStage) {
      case 1: return "Stone cracks under pressure";
      case 2: return "Weathering begins";
      case 3: return "Organic forms emerge";
      case 4: return "Humanity surfaces";
      case 5: return "Weathered wisdom";
      default: return "";
    }
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8 text-center">
      <h2 className="section-header">Ego Furnace</h2>
      
      <div className="mb-6">
        <p className="text-graphite text-sm mb-4">
          Transformation through resistance. No metrics, only change.
        </p>
      </div>

      <div className="space-y-6">
        {getVisualElement()}
        
        <div className="text-center">
          <div className="text-earth-brown italic text-sm">
            {getStageDescription()}
          </div>
          
          <div className="mt-4 w-full bg-parchment-dark h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-graphite to-earth-brown transition-all duration-1000 ease-out"
              style={{ width: `${egoLevel}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-graphite mt-2">
            Ego dissolves through authentic practice
          </div>
        </div>
      </div>
    </div>
  );
};

export default EgoFurnace;
