import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "0",
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "0.5px",
    textTransform: "none",
    _focus: {
      boxShadow: "none",
    },
    transition: "all 0.3s ease",
  },
  sizes: {
    sm: {
      fontSize: "12px",
      padding: "10px 16px",
      height: "36px",
    },
    md: {
      fontSize: "14px",
      padding: "12px 20px",
      height: "44px",
    },
    lg: {
      fontSize: "16px",
      padding: "16px 40px",
      height: "56px",
    },
  },
  variants: {
    solid: {
      color: "#00ffce",
      bg: "transparent",
      border: "1px solid",
      borderColor: "#00ffce",
      _hover: {
        bg: "#00ffce",
        color: "#000000",
        borderColor: "#00ffce",
        transform: "translateY(-2px)",
      },
    },
    outline: {
      color: "rgba(255, 255, 255, 0.9)",
      border: "1px solid",
      borderColor: "rgba(255, 255, 255, 0.2)",
      bg: "transparent",
      _hover: {
        borderColor: "#00ffce",
        color: "#00ffce",
      },
    },
    ghost: {
      color: "rgba(255, 255, 255, 0.7)",
      bg: "transparent",
      _hover: {
        bg: "rgba(255, 255, 255, 0.05)",
        color: "#00ffce",
      },
    },
    oauth: {
      height: "44px",
      border: "1px solid",
      borderColor: "rgba(255, 255, 255, 0.2)",
      bg: "rgba(255, 255, 255, 0.02)",
      color: "#ffffff",
      borderRadius: "0",
      _hover: {
        bg: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
};
