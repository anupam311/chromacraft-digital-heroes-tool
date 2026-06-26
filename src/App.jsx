import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Column from './components/Column';
import {
  createColorObject,
  copyToClipboard,
  hslToHex,
} from "./utils/color";

const initialColors = Array.from(
  { length: 5 },
  () => createColorObject()
);

// ==========================================
// MANDATORY DEVELOPER SETTINGS
// Fill these in before deploying to Vercel!
// ==========================================
const DEVELOPER_NAME = "Anupam Chaudhary";  // Write your name inside the quotes
const DEVELOPER_EMAIL = "anupamchaudhary.dev@gmail.com"; // Write your email inside the quotes
// ==========================================

export default function App() {
  const [harmonyMode, setHarmonyMode] = useState('random');
  const [colors, setColors] = useState(initialColors);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
      <main className="workspace">
        {colors.map((color, index) => (
          <Column
            color={color}
            selected={selectedIndex === index}
            onSelect={() => setSelectedIndex(index)}
            onMouseLeft={() => setSelectedIndex(null)}
            onLock={() => toggleLock(index)}
            onCopy={() => copyColor(index)}
            onHueChange={(value) =>
              updateHue(index, value)
            }
            onSaturationChange={(value) =>
              updateSaturation(index, value)
            }
            onLightnessChange={(value) =>
              updateLightness(index, value)
            }
          />
        ))}
      </main>

      <Footer 
        developerName={DEVELOPER_NAME} 
        developerEmail={DEVELOPER_EMAIL} 
      />
    </>
  );
}

