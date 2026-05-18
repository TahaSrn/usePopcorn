import { useEffect, useState } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=f509cd95&s=${query}`,
            { signal: controller.signal },
          );
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();
          setMovies(data.Search);

          if (data.Response === "False") {
            throw new Error(data.Error);
          }
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        }
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query],
  );
  return { movies, isLoading, error };
}
