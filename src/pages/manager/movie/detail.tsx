import { MainLayout } from "@/layouts/manager/MainLayout";
import { useEffect, useState, type ReactElement } from "react";
import { MovieForm } from "@/components/manager/movie/MovieForm";
import { useRouter } from "next/router";
import { Axios } from "@/lib/Axios";
import { MovieType } from "@/types/manager/Movie";

const MovieDetail = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    if (!router.query.id) return;
    Axios.get(`/movie/detail?movie_id=${router.query.id}`)
      .then((res) => {
        setMovie(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return <MovieForm type={"detail"} movie={movie} />;
};
MovieDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MovieDetail;
