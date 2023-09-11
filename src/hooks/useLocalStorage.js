const useLocalStorage = () => {
  const getStorageValues = () => {
    const storage = window.localStorage;
    let searchData = {
      shorts: false,
      search: "",
      movies: [],
    };
    if (storage.getItem("search") === null) return searchData;
    try {
      const storageSearch = JSON.parse(storage.getItem("search"));
      if (storageSearch.movies.length !== 0) {
        searchData = storageSearch;
      }
    } catch (e) {
      storage.removeItem("search");
    }
    return searchData;
  };

  const setStorageValues = ({ shorts, search, movies }) => {
    const storage = window.localStorage;
    const storageData = {
      shorts: shorts,
      search: search,
      movies: movies,
    };
    storage.setItem("search", JSON.stringify(storageData));
  };
  return {
    getStorageValues,
    setStorageValues,
  };
};

export default useLocalStorage;
