const BASE_URL = "https://api.diploma.maxlivi.ru";

const ROUTES = {
  main: "/",
  movies: "/movies",
  savedMovies: "/saved-movies",
  registration: "/signup",
  login: "/signin",
  signout: "/signout",
  profile: "/users/me",
  notFound: "*",
};

const MESSAGE_TYPE = {
  message: "message",
  error: "error",
  success: "success",
};

const REG_EXP = {
  name: "^[a-zA-ZА-Яа-яЁё \\-]{2,30}$",
  email: "^\\w+([\\-+.']\\w+)*@\\w+([\\-.]\\w+)*\\.\\w{2,30}$",
  password: "^[\\d[a-zA-Z]\\.\\,+\\;:&?\\(\\)*%#=\\-]{6,}$",
};

export { BASE_URL, ROUTES, MESSAGE_TYPE, REG_EXP };
