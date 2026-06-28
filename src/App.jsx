import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Column from './components/Column';
import {
  createColorObject,
  generatePalette,
  copyToClipboard,
  hslToHex,
  getColorName,
} from "./utils/color";

const DEVELOPER_NAME = "Anupam Chaudhary"; 
const DEVELOPER_EMAIL = "anupamchaudhary.dev@gmail.com";

export default function App() {
  const [harmonyMode, setHarmonyMode] = useState('random');
  const [colors, setColors] = useState(generatePalette('random'));
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleGenerate = () => {
    const newPalette = generatePalette(harmonyMode);

    setColors((previous) =>
      previous.map((color, index) =>
        color.locked ? color : newPalette[index]
      )
    );
  };

  const toggleLock = (index) => {
    setColors((previous) =>
      previous.map((color, i) =>
        i === index
          ? {
              ...color,
              locked: !color.locked,
            }
          : color
      )
    );
  };

  const updateColor = (index, property, value) => {
    setColors((previous) =>
      previous.map((color, i) => {
        if (i !== index) return color;

        const updated = {
          ...color,
          [property]: value,
        };

        updated.hex = hslToHex(
          updated.h,
          updated.s,
          updated.l
        );

        updated.name = getColorName(updated.h);
        return updated;
      })
    );
  };

  const onExportToggle = () => {
    console.log('Export modal toggled!');
  };

  return (
    <>
      <Header 
        harmonyMode={harmonyMode} 
        setHarmonyMode={setHarmonyMode} 
        generatePalette={handleGenerate} 
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
              updateColor(index, "h", value)
            }
            onSaturationChange={(value) =>
              updateColor(index, "s", value)
            }
            onLightnessChange={(value) =>
              updateColor(index, "l", value)
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

