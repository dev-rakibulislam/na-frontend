// ────────────────────────────────────────────────
//  Validators
// ────────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,15}$/.test(phone);
}

export function isValidPassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) return { valid: false, message: "At least 8 characters" };
  if (!/[A-Z]/.test(password)) return { valid: false, message: "At least one uppercase letter" };
  if (!/[a-z]/.test(password)) return { valid: false, message: "At least one lowercase letter" };
  if (!/[0-9]/.test(password)) return { valid: false, message: "At least one number" };
  return { valid: true };
}

export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidPostalCode(code: string): boolean {
  return /^[A-Za-z0-9\s\-]{3,10}$/.test(code);
}
