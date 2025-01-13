import React from 'react';

const WelcomeIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[var(--surface-darker)]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
          style={{ 
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite'
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500"
          style={{ 
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite reverse',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center p-8 max-w-lg mx-auto">
        <div className="space-y-6">
          <h1 
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 
                       opacity-0 animate-[fade-in_1s_ease-out_forwards]"
            style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.3)' }}
          >
            Welcome to Time Turner
          </h1>
          <p className="text-lg text-white/90 max-w-md mx-auto opacity-0 animate-[slide-up_1s_ease-out_0.5s_forwards]">
            Discover the ancient wisdom of time through a unique blend of zodiac, TCM, and biorhythm cycles.
          </p>
          <button
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-amber-200/10 to-yellow-500/10 hover:from-amber-200/20 hover:to-yellow-500/20
                     rounded-lg text-amber-200 transition-all duration-300 opacity-0 animate-[fade-in_1s_ease-out_1s_forwards]
                     backdrop-blur-sm border border-amber-200/20 hover:border-amber-200/40 shadow-lg
                     hover:shadow-amber-200/20"
          >
            Begin Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeIntro;
