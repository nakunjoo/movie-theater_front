import { MainLayout } from "@/layouts/manager/MainLayout";
import { type ReactElement } from "react";
import { MovieForm } from "@/components/manager/movie/movieForm";

const MovieAdd = () => {
  return <MovieForm type={"add"} movie={null} />;
};
MovieAdd.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default MovieAdd;
