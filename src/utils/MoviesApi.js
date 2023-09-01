const searchMovies = () => {
  return fetch("https://api.nomoreparties.co/beatfilm-movies").then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }
  );
};

export { searchMovies };
