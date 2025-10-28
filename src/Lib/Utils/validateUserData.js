

export function validateUserData(data) {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    return { valid: false, message: "All fields are required." };
  }

  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 chars long." };
  }

  // could add email regex or username length checks here

  return { valid: true };
}
