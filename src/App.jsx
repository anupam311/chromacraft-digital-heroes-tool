import React, { useState } from 'react';
import Header from './components/Header';

export default function App() {
  const [harmonyMode, setHarmonyMode] = useState('random');

  const generatePalette = () => {
    console.log('Generate palette clicked! Mode:', harmonyMode);
  };

  const onExportToggle = () => {
    console.log('Export modal toggled!');
  };

  return (
    <div className="app-container">
      <Header 
        harmonyMode={harmonyMode} 
        setHarmonyMode={setHarmonyMode} 
        generatePalette={generatePalette} 
        onExportToggle={onExportToggle} 
      />
    </div>
  );
}

