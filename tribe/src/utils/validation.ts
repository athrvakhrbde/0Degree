/**
 * Input validation utilities
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  if (password.length > 128) {
    return { valid: false, message: "Password must be less than 128 characters" };
  }
  return { valid: true };
};

export const validateCommunityName = (name: string): { valid: boolean; message?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, message: "Community name is required" };
  }
  if (name.length < 3) {
    return { valid: false, message: "Community name must be at least 3 characters" };
  }
  if (name.length > 21) {
    return { valid: false, message: "Community name must be less than 21 characters" };
  }
  // Only allow alphanumeric and underscores
  const nameRegex = /^[a-zA-Z0-9_]+$/;
  if (!nameRegex.test(name)) {
    return { valid: false, message: "Community name can only contain letters, numbers, and underscores" };
  }
  return { valid: true };
};

export const validatePostTitle = (title: string): { valid: boolean; message?: string } => {
  if (!title || title.trim().length === 0) {
    return { valid: false, message: "Post title is required" };
  }
  if (title.length < 3) {
    return { valid: false, message: "Post title must be at least 3 characters" };
  }
  if (title.length > 300) {
    return { valid: false, message: "Post title must be less than 300 characters" };
  }
  return { valid: true };
};

export const validatePostBody = (body: string, maxLength: number = 40000): { valid: boolean; message?: string } => {
  if (body.length > maxLength) {
    return { valid: false, message: `Post body must be less than ${maxLength} characters` };
  }
  return { valid: true };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};
