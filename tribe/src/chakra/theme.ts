import { extendTheme } from "@chakra-ui/react";
import { Button } from "./Button";

// Main site design system colors
const colors = {
  brand: {
    50: "#e6fff9",
    100: "#b3ffe8",
    200: "#80ffd7",
    300: "#4dffc6",
    400: "#1affb5",
    500: "#00ffce", // Primary cyan accent
    600: "#00cc9e",
    700: "#00996e",
    800: "#00663e",
    900: "#00331f",
  },
  // Dark mode color palette matching main site
  dark: {
    bg: "#000000",
    card: "#ffffff",
    text: "#ffffff",
    textGray: "rgba(255, 255, 255, 0.7)",
    border: "rgba(255, 255, 255, 0.2)",
  },
};

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  // Force dark mode to match main site
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors,
  fonts: {
    heading: "HelveticaNowDisplay, 'Helvetica Neue', Helvetica, Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    body: "HelveticaNowDisplay, 'Helvetica Neue', Helvetica, Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "48px",
    "5xl": "64px",
    "6xl": "96px",
  },
  space: {
    xs: "8px",
    sm: "16px",
    md: "24px",
    lg: "40px",
    xl: "60px",
    "2xl": "80px",
    "3xl": "120px",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: "#000000",
        color: "#ffffff",
        fontFamily: "HelveticaNowDisplay, 'Helvetica Neue', Helvetica, Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        textRendering: "optimizeLegibility",
        // Grid pattern background
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle, rgba(0, 255, 206, 0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle, rgba(0, 255, 206, 0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 0,
        },
      },
      "*": {
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
        },
      },
      // Ensure main content is above background patterns
      "#__next": {
        position: "relative",
        zIndex: 1,
      },
    }),
  },
  components: {
    Button,
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});
