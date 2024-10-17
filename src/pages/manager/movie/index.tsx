import { MainLayout } from "@/layouts/manager/MainLayout";
import { useEffect, useState, type ReactElement } from "react";
import { MovieList } from "@/components/manager/movie/MovieList";

import { Axios } from "@/lib/Axios";

const MovieMain = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    Axios.get("/movie/list").then((res) => {
      setMovieList(res.data.data);
    });
  }, []);
  return <MovieList movieList={movieList} />;
};
MovieMain.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MovieMain;
