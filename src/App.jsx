import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// ==========================================
// MANDATORY DEVELOPER SETTINGS
// Fill these in before deploying to Vercel!
// ==========================================
const DEVELOPER_NAME = "Anupam Chaudhary";  // Write your name inside the quotes
const DEVELOPER_EMAIL = "anupamchaudhary.dev@gmail.com"; // Write your email inside the quotes
// ==========================================

export default function App() {
  const [harmonyMode, setHarmonyMode] = useState('random');

  const generatePalette = () => {
    console.log('Generate palette clicked! Mode:', harmonyMode);
  };

  const onExportToggle = () => {
    console.log('Export modal toggled!');
  };

  return (
    <>
      <Header 
        harmonyMode={harmonyMode} 
        setHarmonyMode={setHarmonyMode} 
        generatePalette={generatePalette} 
        onExportToggle={onExportToggle} 
      />
      
      {/* Workspace Column Placeholder will go here later */}
      <main style={{ flex: 1 }}></main>

      <Footer 
        developerName={DEVELOPER_NAME} 
        developerEmail={DEVELOPER_EMAIL} 
      />
    </>
  );
}

