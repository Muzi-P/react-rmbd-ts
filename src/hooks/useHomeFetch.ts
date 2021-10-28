import { useEffect, useState } from "react";
// API
import API, { Movie } from "../API";
import { isPersistentState } from "../helpers";

const intialState = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};

const useHomeFetch = () => {
  const [state, setState] = useState(intialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page: number, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // intial render and search
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = isPersistentState("homeState");
      if (sessionState) {
        setState(sessionState);
        return;
      }
    }
    setState(intialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // load more movies

  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  // write to session storage

  useEffect(() => {
    if (!searchTerm) {
      sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
};

export default useHomeFetch;
