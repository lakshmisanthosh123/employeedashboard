const VALID_EMAIL = "sample@gmail.com";
const VALID_PASSWORD = "12345!@Aa";

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);

export const login = (email: string, password: string) => {
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    localStorage.setItem("auth", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("auth");
};

export const isAuthenticated = () => localStorage.getItem("auth") === "true";
