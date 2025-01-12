import React from 'react';

interface BiorhythmRingProps {
  radius: number;
  birthDate: string;
}

interface Cycle {
  name: string;
  days: number;
  color: string;
}

const CYCLES: Cycle[] = [
  { name: 'Physical', days: 23, color: '#FF6B6B' },
  { name: 'Emotional', days: 28, color: '#4ECDC4' },
  { name: 'Intellectual', days: 33, color: '#FFD93D' }
];

const BiorhythmRing: React.FC<BiorhythmRingProps> = ({ radius, birthDate }) => {
  const calculateBiorhythm = (cycle: number, birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const days = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const position = Math.sin((2 * Math.PI * days) / cycle);
    return position;
  };

  const createArcPath = (radius: number, cycle: Cycle) => {
    const value = calculateBiorhythm(cycle.days, birthDate);
    const startAngle = -90; // Start from top
    const endAngle = startAngle + (value + 1) * 180; // Map -1 to 1 to 0 to 360 degrees
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 200 + radius * Math.cos(startRad);
    const y1 = 200 + radius * Math.sin(startRad);
    const x2 = 200 + radius * Math.cos(endRad);
    const y2 = 200 + radius * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <g className="biorhythm-ring">
      <circle
        cx="200"
        cy="200"
        r={radius}
        fill="url(#engravedPattern)"
        stroke="url(#goldMetallic)"
        strokeWidth="25"
        opacity="0.7"
      />
      {CYCLES.map((cycle, index) => {
        const cycleRadius = radius - (index * 8) - 4;
        return (
          <path
            key={cycle.name}
            d={createArcPath(cycleRadius, cycle)}
            fill="none"
            stroke={cycle.color}
            strokeWidth="2"
            filter="url(#glow)"
            opacity="0.8"
          />
        );
      })}
    </g>
  );
};

export default BiorhythmRing;
