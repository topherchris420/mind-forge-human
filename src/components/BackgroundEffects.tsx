
import React from 'react';

const BackgroundEffects = () => {
  return (
    <>
      {/* Subtle ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-parchment via-transparent to-parchment-dark opacity-30"></div>
      </div>
    </>
  );
};

export default BackgroundEffects;
