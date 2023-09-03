const TECHNOLOGIES = [
  {
    name: "HTML",
  },
  {
    name: "CSS",
  },
  {
    name: "JS",
  },
  {
    name: "React",
  },
  {
    name: "Git",
  },
  {
    name: "Express.js",
  },
  {
    name: "mongoDB",
  },
];

const PROJECTS_LIST = [
  {
    name: "Статичный сайт",
    url: "https://maxlivi1.github.io/how-to-learn/",
  },
  {
    name: "Адаптивный сайт",
    url: "https://maxlivi1.github.io/russian-travel/",
  },
  {
    name: "Одностраничное приложение",
    url: "https://maxlivi.students.nomoredomains.xyz",
  },
];

const ROUTES = {
  main: "/",
  movies: "/movies",
  savedMovies: "/saved-movies",
  registration: "/signup",
  login: "/signin",
  signout: "/signout",
  profile: "/profile",
  notFound: "*",
};

const MESSAGE_TYPE = {
  message: "message",
  error: "error",
  success: "success",
};

export { TECHNOLOGIES, PROJECTS_LIST, ROUTES, MESSAGE_TYPE };
