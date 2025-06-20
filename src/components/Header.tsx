
import React from 'react';

const Header = () => {
  return (
    <header className="border-b-2 border-graphite-light bg-parchment py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <img 
            src="/lovable-uploads/63676c42-f869-4b6e-b4bd-37cf0ea17c7e.png" 
            alt="OffSwitch Logo" 
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-4xl font-bold text-charcoal" style={{ fontFamily: 'Georgia, serif' }}>
            OffSwitch
          </h1>
        </div>
        <p className="text-graphite text-lg">
          Cognitive sovereignty through deliberate resistance to automation
        </p>
      </div>
    </header>
  );
};

export default Header;
