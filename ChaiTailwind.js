const colors = {
  red: {
    100: "#fee2e2",
    300: "#fca5a5",
    500: "#ef4444",
    700: "#b91c1c",
  },
  blue: {
    100: "#dbeafe",
    300: "#93c5fd",
    500: "#3b82f6",
    700: "#1d4ed8",
  },
  green: {
    100: "#dcfce7",
    300: "#86efac",
    500: "#22c55e",
    700: "#15803d",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  indigo: {
    100: "#e0e7ff",
    300: "#a5b4fc",
    500: "#6366f1",
    700: "#4338ca",
    900: "#312e81",
  },
  slate: {
    50: "#f8fafc",
    900: "#0f172a",
    950: "#020617",
  },
  white: { 500: "#ffffff" },
  black: { 500: "#000000" },
  transparent: { 500: "transparent" },
};

const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
  full: "100%",
  screen: "100vw",
  vh: "100vh",
  auto: "auto",
};

const textAlignMap = {
  center: "center",
  left: "left",
  right: "right",
  justify: "justify",
};

const fontSize = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "60px",
  "7xl": "72px",
};

const fontWeight = {
  thin: "100",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
};

const fontFamily = {
  sans: "'Instrument Sans', sans-serif",
  serif: "'Playfair Display', serif",
};

const textDecoration = {
  underline: "underline",
  overline: "overline",
  line: "line-through",
  none: "none",
};

const rounded = {
  none: "0px",
  sm: "2px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px",
};

const borderTypes = ["dashed", "solid", "dotted"];

const parseSpacing = (val) => {
  if (spacing[val]) return spacing[val];
  if (typeof val === 'string' && (val.includes('px') || val.includes('%') || val.includes('vh') || val.includes('vw'))) {
    return val;
  }
  if (!isNaN(val) && val !== "") return val * 4 + "px";
  return val;
};

const elements = document.querySelectorAll('[class*="chai-"]');
const start = performance.now();

elements.forEach((e) => {
  e.classList.forEach((cls) => {
    if (!cls.startsWith("chai-")) return;
    const parts = cls.split("-");

    // Background: chai-bg-color-shade
    if (parts[1] === "bg") {
      const colorName = parts[2];
      const shade = parts[3];
      let color = shade ? colors[colorName]?.[shade] : colors[colorName]?.[500];
      if (color) e.style.backgroundColor = color;
    }

    // Border
    if (parts[1] === "border") {
      const val = parts[2];
      if (!isNaN(val)) {
        e.style.borderWidth = val + "px";
      } else if (borderTypes.includes(val)) {
        e.style.borderStyle = val;
      } else if (colors[val]) {
        const shade = parts[3];
        const color = shade ? colors[val]?.[shade] : colors[val]?.[500];
        if (color) e.style.borderColor = color;
      }
      if (!e.style.borderStyle) e.style.borderStyle = "solid";
    }

    // Padding
    if (parts[1].startsWith("p")) {
      const type = parts[1];
      const val = parseSpacing(parts[2]);
      if (type === "p") e.style.padding = val;
      if (type === "px") {
        e.style.paddingLeft = val;
        e.style.paddingRight = val;
      }
      if (type === "py") {
        e.style.paddingTop = val;
        e.style.paddingBottom = val;
      }
      if (type === "pt") e.style.paddingTop = val;
      if (type === "pb") e.style.paddingBottom = val;
      if (type === "pl") e.style.paddingLeft = val;
      if (type === "pr") e.style.paddingRight = val;
    }

    // Margin: chai-m-val, chai-mx-val, chai-my-val, etc.
    if (parts[1].startsWith("m")) {
      const type = parts[1];
      const val = parseSpacing(parts[2]);
      if (type === "m") e.style.margin = val;
      if (type === "mx") {
        e.style.marginLeft = val;
        e.style.marginRight = val;
      }
      if (type === "my") {
        e.style.marginTop = val;
        e.style.marginBottom = val;
      }
      if (type === "mt") e.style.marginTop = val;
      if (type === "mb") e.style.marginBottom = val;
      if (type === "ml") e.style.marginLeft = val;
      if (type === "mr") e.style.marginRight = val;
    }

    // Text
    if (parts[1] === "text") {
      const key = parts[2];
      const shade = parts[3];
      if (textAlignMap[key]) e.style.textAlign = textAlignMap[key];
      if (fontSize[key]) e.style.fontSize = fontSize[key];
      if (textDecoration[key]) e.style.textDecoration = textDecoration[key];
      if (key === "italic") e.style.fontStyle = "italic";
      if (fontWeight[key]) e.style.fontWeight = fontWeight[key];
      if (colors[key]?.[shade]) e.style.color = colors[key]?.[shade];
      else if (colors[key]?.[500]) e.style.color = colors[key]?.[500];
    }
    // Leading (line-height)
    if (parts[1] === "leading") {
      e.style.lineHeight = parts[2];
    }
    // Font family    // Font family
    if (parts[1] === "font" && fontFamily[parts[2]]) {
      e.style.fontFamily = fontFamily[parts[2]];
    }

    // Width/Height
    if (parts[1] === "w") e.style.width = parseSpacing(parts[2]);
    if (parts[1] === "h") e.style.height = parseSpacing(parts[2]);
    if (parts[1] === "max" && parts[2] === "w")
      e.style.maxWidth = parseSpacing(parts[3]);

    // Rounded
    if (parts[1] === "rounded") {
      const val = parts[2] || "md";
      e.style.borderRadius = rounded[val] || val + "px";
    }

    // Display
    if (parts[1] === "flex") e.style.display = "flex";
    if (parts[1] === "block") e.style.display = "block";
    if (parts[1] === "hidden") e.style.display = "none";
    if (parts[1] === "grid") e.style.display = "grid";

    // Flex/Grid utilities
    if (parts[1] === "flex" && parts[2] === "col")
      e.style.flexDirection = "column";

    if (parts[1] === "items") {
      if (parts[2] === "center") e.style.alignItems = "center";
      else if (parts[2] === "start") e.style.alignItems = "flex-start";
      else if (parts[2] === "end") e.style.alignItems = "flex-end";
      else if (parts[2] === "stretch") e.style.alignItems = "stretch";
    }

    if (parts[1] === "justify") {
      if (parts[2] === "center") e.style.justifyContent = "center";
      else if (parts[2] === "between") e.style.justifyContent = "space-between";
      else if (parts[2] === "start") e.style.justifyContent = "flex-start";
      else if (parts[2] === "end") e.style.justifyContent = "flex-end";
      else if (parts[2] === "around") e.style.justifyContent = "space-around";
    }

    if (parts[1] === "gap") e.style.gap = parseSpacing(parts[2]);
  });
});

const end = performance.now();
console.log(`Total Time Taken : ${(end - start).toFixed(2)}ms`);
