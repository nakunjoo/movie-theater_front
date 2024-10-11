import { MainLayout } from "@/layouts/manager/MainLayout";
import { type ReactElement } from "react";
import { TheaterForm } from "@/components/manager/theater/TheaterForm";

const TheaterAdd = () => {
  return <TheaterForm type={"add"} theater={null} />;
};
TheaterAdd.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TheaterAdd;
