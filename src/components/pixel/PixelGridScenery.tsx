import React from 'react';

export const PixelGridScenery: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Deep atmosphere gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1322] via-[#0B0F19] to-[#070A12]" />

      {/* Subtle top ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-kirei-purple/15 via-kirei-pink/10 to-transparent blur-[120px] rounded-full" />
      <div className="absolute top-[30%] -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-kirei-purple/10 via-kirei-cyan/5 to-transparent blur-[140px] rounded-full" />
      <div className="absolute top-[60%] -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-kirei-pink/10 via-kirei-yellow/5 to-transparent blur-[140px] rounded-full" />

      {/* Retro isometric / grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #8B5CF6 1px, transparent 1px),
            linear-gradient(to bottom, #8B5CF6 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Scattered ambient pixel stars */}
      <div className="absolute top-16 left-[12%] w-1 h-1 bg-kirei-yellow/40 animate-pulse" />
      <div className="absolute top-28 right-[18%] w-1.5 h-1.5 bg-kirei-pink/50 animate-sparkle" />
      <div className="absolute top-72 left-[25%] w-1 h-1 bg-kirei-purple/40" />
      <div className="absolute top-96 right-[28%] w-1 h-1 bg-kirei-cyan/40 animate-pulse" />
      <div className="absolute top-[650px] left-[8%] w-1.5 h-1.5 bg-kirei-yellow/30" />
      <div className="absolute top-[800px] right-[10%] w-1 h-1 bg-kirei-purple/30 animate-pulse" />
    </div>
  );
};
