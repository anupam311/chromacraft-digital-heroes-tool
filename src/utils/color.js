// Generate random HEX color
export function generateRandomColor() {
  const letters = "0123456789ABCDEF";

  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// Copy HEX to clipboard
export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// HEX → HSL
export function hexToHsl(hex) {
  hex = hex.replace("#", "");

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let h;
  let s;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;

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
        h = 0;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// HSL → HEX
export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c =
    (1 - Math.abs(2 * l - 1)) * s;

  const x =
    c *
    (1 -
      Math.abs(
        ((h / 60) % 2) - 1
      ));

  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
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

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return (
    "#" +
    [r, g, b]
      .map((value) =>
        value
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
      .toUpperCase()
  );
}

// Create full color object
export function createColorObject() {
  const hex = generateRandomColor();

  const { h, s, l } =
    hexToHsl(hex);

  return {
    hex,
    h,
    s,
    l,
    locked: false,
    name: "Custom Color",
  };
}