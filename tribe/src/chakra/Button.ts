import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "1px",
    textTransform: "uppercase",
    _focus: {
      boxShadow: "none",
    },
    transition: "all 0.3s ease",
  },
  sizes: {
    sm: {
      fontSize: "12px",
      padding: "6px 16px",
    },
    md: {
      fontSize: "14px",
      padding: "8px 20px",
    },
    lg: {
      fontSize: "16px",
      padding: "16px 40px",
    },
  },
  variants: {
    solid: {
      color: "#000000",
      bg: "brand.500",
      border: "2px solid",
      borderColor: "brand.500",
      _hover: {
        bg: "brand.400",
        borderColor: "brand.400",
        transform: "translateY(-2px)",
        boxShadow: "0 10px 30px rgba(0, 255, 206, 0.3)",
      },
    },
    outline: {
      color: "brand.500",
      border: "2px solid",
      borderColor: "brand.500",
      bg: "transparent",
      _hover: {
        bg: "brand.500",
        color: "#000000",
        borderColor: "brand.500",
      },
    },
    ghost: {
      color: "brand.500",
      bg: "transparent",
      _hover: {
        bg: "rgba(0, 255, 206, 0.1)",
      },
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "rgba(255, 255, 255, 0.2)",
      bg: "rgba(255, 255, 255, 0.02)",
      color: "#ffffff",
      _hover: {
        bg: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
};
