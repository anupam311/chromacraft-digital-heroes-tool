import React from "react";
import {Lock, LockOpen, Copy} from "lucide-react";

function Column({
  color,
  selected,
  onSelect,
  onMouseLeft,
  onLock,
  onCopy,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
}) {
  return (
    <div
      className={`column ${selected ? "selected" : ""}`}
      style={{ backgroundColor: color.hex }}
      onMouseOver={onSelect}
      onMouseLeave={onMouseLeft}
    >
      {/* Top Controls */}
      <div className="column-top">
        <button
          className={`icon-btn ${color.locked ? "locked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onLock();
          }}
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
        >
          <Copy size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Color Info */}
      <div className="column-info">
        <h2>{color.hex}</h2>
        <p>{color.name}</p>
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