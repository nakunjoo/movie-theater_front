import { Main } from "@/layouts/Main";
import React, { ReactElement, useEffect, useState } from "react";
import { MovieType } from "@/lib/types";
import { MovieList } from "@/components/movie/MovieList";

import { Axios } from "@/lib/Axios";

const Home = () => {
  const [movieList, setMovieList] = useState<MovieType[] | null>(null);

  useEffect(() => {
    Axios.get("/movie/list").then((res) => {
      setMovieList(res.data.data);
    });
  }, []);

  return (
    <div className="container text-center flex justify-center">
      <MovieList movieList={movieList} />
    </div>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default Home;
