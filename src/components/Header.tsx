
import React from 'react';

const Header = () => {
  return (
    <header className="border-b-2 border-graphite-light bg-parchment py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-charcoal mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          OffSwitch
        </h1>
        <p className="text-graphite text-lg">
          Cognitive sovereignty through deliberate resistance to automation
        </p>
      </div>
    </header>
  );
};

export default Header;
