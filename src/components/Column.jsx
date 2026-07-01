import React, {useState, useEffect} from "react";
import {Lock, LockOpen, Copy} from "lucide-react";

function Column({
  color,
  selected,
  onSelect,
  onMouseLeft,
  onLock,
  onCopy,
  onHexChange,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
}) {
  const [hexInput, setHexInput] = useState(color.hex);

  useEffect(() => {
    setHexInput(color.hex);
  }, [color.hex]);

  const isValidHex = (hex) => {
    const hexRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
    return hexRegex.test(hex);
  };

  return (
    <div
      className={`column ${selected ? "selected" : ""}`}
      style={{ backgroundColor: color.hex }}
      onMouseOver={onSelect}
      onMouseLeave={onMouseLeft}
    >
      {/* Top Controls */}
      <div className="column-top" >
        <button
          className={`icon-btn ${color.locked ? "locked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onLock();
          }}
          style={{ backgroundColor: color.l > 50? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)" }}
        >
          {color.locked ? (
            <Lock size={18} strokeWidth={2} />
          ) : (
            <LockOpen size={18} strokeWidth={2} />
          )}
        </button>
        <button
          className="icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            onCopy();
          }}
          title="Copy HEX"
          style={{ backgroundColor: color.l > 50? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)" }}
        >
          <Copy size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Color Info */}
      <div className="column-info">
        <input 
          className={`hex-input ${
            !isValidHex(hexInput) ? "invalid" : ""
          }`}
          type="text" 
          value={hexInput.toUpperCase()} 
          onChange={(e) => {
            const value = e.target.value.toUpperCase().replace(/[^0-9A-F#]/g, "");

            if (!value.startsWith("#")) {
              value = "#" + value;
            }

            setHexInput(value);
            
            if (isValidHex(value)) {
              onHexChange(value);
            }
          }}

           onKeyDown={(e) => {
            if (
                e.key === "Enter" &&
                isValidHex(hexInput)
            ) {
                onHexChange(hexInput);
            }
          }}

          maxlength="7" 
          style={{ color: color.l > 70 ? "#111827" : "#ffffff" }} 
        />

        <p style={{ color: color.l > 70 ? "#111827" : "#ffffff" }}>{color.name}</p>
      </div>

      {/* HSL Controls */}
      {selected && (
        <div
          className="controls-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="slider-group">
            <div className="slider-label">
              <label>Hue</label>
              <span>{color.h}</span>
            </div>
            <input
              className="hue-slider"
              type="range"
              min="0"
              max="360"
              value={color.h}
              onChange={(e) =>
                onHueChange(Number(e.target.value))
              }
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <label>Saturation</label>
              <span>{color.s}%</span>
            </div>
            <input
              className="saturation-slider"
              type="range"
              min="0"
              max="100"
              value={color.s}
              onChange={(e) =>
                onSaturationChange(Number(e.target.value))
              }
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <label>Lightness</label>
              <span>{color.l}%</span>
            </div>
            <input
              className="lightness-slider"
              type="range"
              min="0"
              max="100"
              value={color.l}
              onChange={(e) =>
                onLightnessChange(Number(e.target.value))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Column;