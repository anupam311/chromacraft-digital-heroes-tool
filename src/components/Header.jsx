import React from 'react';

export default function Header({ harmonyMode, setHarmonyMode, generatePalette, onExportToggle }) {
  return (
    <header className="app-header glass-panel">
      {/* Brand Logo */}
      <div className="logo-container">
        <span className="logo-icon">🎨</span>
        <span className="logo-text">ChromaCraft</span>
      </div>

      {/* Control Actions */}
      <div className="controls-container">
        {/* Color Harmony Selection */}
        <select
          id="harmony-select"
          className="btn btn-secondary"
          value={harmonyMode}
          onChange={(e) => setHarmonyMode(e.target.value)}
          title="Choose a color harmony scheme"
        >
          <option value="random">Random Scheme</option>
          <option value="analogous">Analogous Harmony</option>
          <option value="monochromatic">Monochromatic Scheme</option>
          <option value="complementary">Complementary Scheme</option>
          <option value="triadic">Triadic Harmony</option>
        </select>

        {/* Generate Button with Space hint */}
        <button
          id="btn-generate"
          className="btn btn-primary"
          onClick={generatePalette}
        >
          Generate <span className="kbd-shortcut">Space</span>
        </button>

        {/* Export Palette Button */}
        <button
          id="btn-export-toggle"
          className="btn btn-secondary"
          onClick={onExportToggle}
        >
          Export Palette
        </button>
      </div>
    </header>
  );
}
