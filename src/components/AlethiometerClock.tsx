import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TcmRing from './TcmRing';
import BiorhythmRing from './BiorhythmRing';

interface TimeRing {
  type: 'zodiac' | 'lunar' | 'daily';
  currentPosition: number;
  totalDivisions: number;
  symbols: Array<{
    position: number;
    symbol: string;
    meaning: string;
  }>;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries' },
  { symbol: '♉', name: 'Taurus' },
  { symbol: '♊', name: 'Gemini' },
  { symbol: '♋', name: 'Cancer' },
  { symbol: '♌', name: 'Leo' },
  { symbol: '♍', name: 'Virgo' },
  { symbol: '♎', name: 'Libra' },
  { symbol: '♏', name: 'Scorpio' },
  { symbol: '♐', name: 'Sagittarius' },
  { symbol: '♑', name: 'Capricorn' },
  { symbol: '♒', name: 'Aquarius' },
  { symbol: '♓', name: 'Pisces' }
];

interface AlethiometerClockProps {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

const AlethiometerClock: React.FC<AlethiometerClockProps> = ({ birthDate, birthTime, birthPlace }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (index * 360) / total - 90; // -90 to start at top
    const radian = (angle * Math.PI) / 180;
    return {
      x: 200 + radius * Math.cos(radian),
      y: 200 + radius * Math.sin(radian),
      angle
    };
  };

  // Calculate zodiac position based on birth date
  const getZodiacPosition = (date: string) => {
    const birthDate = new Date(date);
    const month = birthDate.getMonth();
    const day = birthDate.getDate();
    
    // Simple zodiac calculation (can be made more accurate)
    const zodiacDates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
    const zodiacIndex = day >= zodiacDates[month] ? month : (month + 11) % 12;
    return zodiacIndex;
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Calculate fixed positions based on birth data
    const [birthHour, birthMinute] = birthTime.split(':').map(Number);
    const zodiacIndex = getZodiacPosition(birthDate);
    
    // Set fixed rotations based on birth time
    gsap.set('.zodiac-ring', {
      rotation: (zodiacIndex * 30), // 360/12 = 30 degrees per zodiac sign
      transformOrigin: 'center center'
    });

    gsap.set('.daily-ring', {
      rotation: ((birthHour + birthMinute/60) * -15), // 360/24 = 15 degrees per hour
      transformOrigin: 'center center'
    });

    // Subtle pulse animation for symbols
    gsap.to('.zodiac-symbol, .hour-marker', {
      opacity: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, [birthDate, birthTime]); // Added dependencies

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full"
      >
        <defs>
          {/* Rich metallic gradient */}
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#462523', stopOpacity: 1 }} />
            <stop offset="20%" style={{ stopColor: '#CB9B51', stopOpacity: 1 }} />
            <stop offset="45%" style={{ stopColor: '#F6E27A', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#F6F2C0', stopOpacity: 1 }} />
            <stop offset="55%" style={{ stopColor: '#F6E27A', stopOpacity: 1 }} />
            <stop offset="80%" style={{ stopColor: '#CB9B51', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#462523', stopOpacity: 1 }} />
          </linearGradient>
          
          {/* Engraved pattern */}
          <pattern id="engravedPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0 10 Q5 0, 10 10 T20 10"
              fill="none"
              stroke="#000"
              strokeWidth="0.5"
              opacity="0.1"
            />
          </pattern>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Enhanced shadow */}
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
            <feOffset in="blur" dx="2" dy="2" result="offsetBlur"/>
            <feComposite in="SourceAlpha" in2="offsetBlur" operator="over"/>
            <feFlood floodColor="rgba(0,0,0,0.5)" result="color"/>
            <feComposite in="color" in2="SourceAlpha" operator="in" result="shadow"/>
            <feComposite in="shadow" in2="SourceGraphic" operator="over"/>
          </filter>

          {/* Radial texture */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#F6F2C0', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#CB9B51', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        
        {/* Background glow */}
        <circle
          cx="200"
          cy="200"
          r="195"
          fill="url(#centerGlow)"
          opacity="0.3"
        />
        
        {/* Outer frame */}
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="url(#engravedPattern)"
          stroke="url(#goldMetallic)"
          strokeWidth="8"
          filter="url(#innerShadow)"
        />

        {/* Zodiac ring */}
        <g className="zodiac-ring">
          <circle
            cx="200"
            cy="200"
            r="175"
            fill="url(#engravedPattern)"
            stroke="url(#goldMetallic)"
            strokeWidth="40"
            opacity="0.7"
          />
          {ZODIAC_SIGNS.map((sign, index) => {
            const { x, y, angle } = calculatePosition(index, 12, 175);
            return (
              <g key={sign.name} transform={`translate(${x},${y}) rotate(${angle})`}>
                <text
                  className="zodiac-symbol"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#F6F2C0"
                  fontSize="20"
                  filter="url(#glow)"
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  {sign.symbol}
                </text>
              </g>
            );
          })}
        </g>

        {/* TCM Ring */}
        <TcmRing radius={140} />

        {/* Daily ring */}
        <g className="daily-ring">
          <circle
            cx="200"
            cy="200"
            r="105"
            fill="url(#engravedPattern)"
            stroke="url(#goldMetallic)"
            strokeWidth="30"
            opacity="0.85"
          />
          {HOURS.map((hour) => {
            const { x, y, angle } = calculatePosition(hour, 24, 105);
            return (
              <g key={hour} transform={`translate(${x},${y}) rotate(${angle})`}>
                <text
                  className="hour-marker"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="#F6F2C0"
                  fontSize="14"
                  filter="url(#glow)"
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  {hour}
                </text>
              </g>
            );
          })}
        </g>

        {/* Biorhythm ring */}
        <BiorhythmRing radius={75} birthDate={birthDate} />

        {/* Center piece */}
        <circle
          cx="200"
          cy="200"
          r="45"
          fill="url(#goldMetallic)"
          filter="url(#innerShadow)"
        />
        
        {/* Indicator */}
        <circle
          cx="200"
          cy="200"
          r="5"
          fill="#F6F2C0"
          filter="url(#glow)"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

export default AlethiometerClock;
