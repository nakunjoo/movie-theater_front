import { MainLayout } from "@/layouts/manager/MainLayout";
import { useEffect, useState, type ReactElement } from "react";
import { MovieForm } from "@/components/manager/movie/MovieForm";
import { useRouter } from "next/router";
import { MovieType } from "@/lib/types";

const MovieUpdate = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    if (!router.query) return;
    const storageData = window.localStorage.getItem("updated_movie");
    if (storageData) {
      const movieData = JSON.parse(storageData);
      setMovie(movieData);
    }
  }, [router]);
  return <MovieForm type={"update"} movie={movie} />;
};
MovieUpdate.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MovieUpdate;
