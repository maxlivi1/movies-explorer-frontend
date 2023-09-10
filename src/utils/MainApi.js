import { ROUTES } from "./constants";

const baseUrl = "https://api.diploma.maxlivi.ru";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.json());
};

const register = ({ name, email, password }) => {
  return fetch(`${baseUrl}${ROUTES.registration}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, password, email }),
  }).then((response) => checkResponse(response));
};

const login = ({ email, password }) => {
  return fetch(`${baseUrl}${ROUTES.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password, email }),
  }).then((response) => checkResponse(response));
};

const signout = () => {
  return fetch(`${baseUrl}${ROUTES.signout}`, {
    credentials: "include",
  }).then((response) => checkResponse(response));
};

const getUserInfo = () => {
  return fetch(`${baseUrl}${ROUTES.profile}`, {
    credentials: "include",
  }).then((response) => checkResponse(response));
};

const updateUserInfo = ({ name, email }) => {
  return fetch(`${baseUrl}${ROUTES.profile}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email }),
  }).then((response) => checkResponse(response));
};

const getSavedMovies = () => {
  return fetch(`${baseUrl}${ROUTES.movies}`, {
    credentials: "include",
  }).then((response) => checkResponse(response));
};

const deleteMovie = (movieId) => {
  return fetch(`${baseUrl}${ROUTES.movies}/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => checkResponse(response));
};

const saveMovie = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
}) => {
  return fetch(`${baseUrl}${ROUTES.movies}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    }),
  }).then((response) => checkResponse(response));
};

export {
  register,
  login,
  signout,
  getUserInfo,
  updateUserInfo,
  getSavedMovies,
  saveMovie,
  deleteMovie,
};
