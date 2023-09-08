const getFilteredMovies = (moviesList, request, isShort) => {
  const req = request.trim().toLowerCase();
  let list = [];

  if (isShort) {
    list = moviesList
      .filter((i) => i.duration < 40)
      .filter(
        (i) =>
          i.nameRU.toLowerCase().includes(req) ||
          i.nameEN.toLowerCase().includes(req)
      );
  } else {
    list = moviesList.filter(
      (i) =>
        i.nameRU.toLowerCase().includes(req) ||
        i.nameEN.toLowerCase().includes(req)
    );
  }
  return list;
};

export default getFilteredMovies;
