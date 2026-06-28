// =========================================
// BASIC HELPERS
// =========================================

export function wrapHue(h) {
  return ((h % 360) + 360) % 360;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function randomOffset(range) {
  return Math.floor(Math.random() * (range * 2 + 1)) - range;
}

// =========================================
// RANDOM HEX COLOR
// =========================================

export function generateRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
}

// =========================================
// CLIPBOARD
// =========================================

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

// =========================================
// HEX -> RGB
// =========================================

export function hexToRgb(hex) {
  hex = hex.replace("#", "");

  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

// =========================================
// RGB -> HEX
// =========================================

export function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.round(v)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
      .toUpperCase()
  );
}

// =========================================
// HEX -> HSL
// =========================================

export function hexToHsl(hex) {
  let { r, g, b } = hexToRgb(hex);

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s =
      l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {
      case r:
        h =
          (g - b) / d +
          (g < b ? 6 : 0);
        break;

      case g:
        h =
          (b - r) / d + 2;
        break;

      case b:
        h =
          (r - g) / d + 4;
        break;

      default:
        break;
    }

    h *= 60;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// =========================================
// HSL -> HEX
// =========================================

export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c =
    (1 - Math.abs(2 * l - 1)) * s;

  const x =
    c *
    (1 -
      Math.abs((h / 60) % 2 - 1));

  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return rgbToHex(
    (r + m) * 255,
    (g + m) * 255,
    (b + m) * 255
  );
}

// =========================================
// SIMPLE COLOR NAMES
// =========================================

export function getColorName(h) {
  h = wrapHue(h);

  if (h < 15) return "Red";
  if (h < 40) return "Orange";
  if (h < 65) return "Gold";
  if (h < 90) return "Yellow";
  if (h < 150) return "Green";
  if (h < 190) return "Cyan";
  if (h < 230) return "Blue";
  if (h < 270) return "Indigo";
  if (h < 315) return "Purple";

  return "Rose";
}

// =========================================
// CREATE COLOR OBJECT
// =========================================

export function createColorFromHSL(
  h,
  s,
  l
) {
  return {
    hex: hslToHex(h, s, l),

    h: wrapHue(Math.round(h)),
    s: clamp(Math.round(s), 0, 100),
    l: clamp(Math.round(l), 0, 100),

    locked: false,

    name: getColorName(h),
  };
}

export function createColorObject() {
  const hue = Math.floor(
    Math.random() * 360
  );

  const saturation =
    60 + Math.floor(Math.random() * 31);

  const lightness =
    40 + Math.floor(Math.random() * 21);

  return createColorFromHSL(
    hue,
    saturation,
    lightness
  );
}

// =========================================
// RANDOM PALETTE
// =========================================

export function generateRandomPalette(count = 5) {
  return Array.from(
    { length: count },
    () => createColorObject()
  );
}

// =========================================
// ANALOGOUS PALETTE
// =========================================

export function generateAnalogousPalette() {
  const baseHue = Math.floor(Math.random() * 360);

  const baseS =
    65 + Math.floor(Math.random() * 20);

  const baseL =
    45 + Math.floor(Math.random() * 20);

  const offsets = [-40, -20, 0, 20, 40];

  return offsets.map((offset) =>
    createColorFromHSL(
      wrapHue(baseHue + offset),

      clamp(baseS + randomOffset(8), 45, 95),

      clamp(baseL + randomOffset(8), 25, 85)
    )
  );
}

// =========================================
// MONOCHROMATIC PALETTE
// =========================================

export function generateMonochromaticPalette() {
  const baseHue = Math.floor(Math.random() * 360);

  return [
    createColorFromHSL(baseHue, 35, 18),

    createColorFromHSL(baseHue, 50, 32),

    createColorFromHSL(baseHue, 65, 48),

    createColorFromHSL(baseHue, 78, 64),

    createColorFromHSL(baseHue, 90, 82),
  ];
}

// =========================================
// COMPLEMENTARY PALETTE
// =========================================

export function generateComplementaryPalette() {
  const baseHue = Math.floor(Math.random() * 360);

  const complement =
    wrapHue(baseHue + 180);

  return [
    createColorFromHSL(baseHue, 85, 30),

    createColorFromHSL(baseHue, 75, 55),

    createColorFromHSL(baseHue, 55, 75),

    createColorFromHSL(complement, 75, 50),

    createColorFromHSL(complement, 60, 70),
  ];
}

// =========================================
// TRIADIC PALETTE
// =========================================

export function generateTriadicPalette() {
  const baseHue = Math.floor(Math.random() * 360);

  const second =
    wrapHue(baseHue + 120);

  const third =
    wrapHue(baseHue + 240);

  return [
    createColorFromHSL(baseHue, 75, 45),

    createColorFromHSL(second, 72, 50),

    createColorFromHSL(third, 72, 55),

    createColorFromHSL(baseHue, 40, 78),

    createColorFromHSL(second, 35, 25),
  ];
}

// =========================================
// MASTER PALETTE GENERATOR
// =========================================

export function generatePalette(mode) {
  switch (mode) {
    case "analogous":
      return generateAnalogousPalette();

    case "monochromatic":
      return generateMonochromaticPalette();

    case "complementary":
      return generateComplementaryPalette();

    case "triadic":
      return generateTriadicPalette();

    case "random":
    default:
      return generateRandomPalette();
  }
}