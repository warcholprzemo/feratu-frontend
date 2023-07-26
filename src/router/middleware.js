export function requireAuth(to, from, next) {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    next({ name: "login-page" });
  } else {
    next();
  }
}
