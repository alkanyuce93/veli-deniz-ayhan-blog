import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#2D3047",
    secondary: "#419D78",
    accent: "#E0A458",
    background: "#FFFFFF",
    text: "#2D3047",
    lightGray: "#F5F5F5",
    darkGray: "#4A4A4A",
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Open Sans', sans-serif",
  },
  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1024px",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
    xlarge: "4rem",
  },
};

export const lightTheme = {
  colors: {
    primary: "#2563eb",
    secondary: "#4f46e5",
    accent: "#0ea5e9",
    background: "#ffffff",
    text: "#1f2937",
    darkGray: "#4b5563",
    lightGray: "#f3f4f6",
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Open Sans', sans-serif",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
    xlarge: "4rem",
  },
  breakpoints: {
    mobile: "640px",
    tablet: "768px",
    desktop: "1024px",
  },
  isDark: false,
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    primary: "#60a5fa",
    secondary: "#818cf8",
    accent: "#38bdf8",
    background: "#111827",
    text: "#e5e7eb",
    darkGray: "#d1d5db",
    lightGray: "#1f2937",
  },
  isDark: true,
};

export type Theme = typeof lightTheme;

export default theme;
