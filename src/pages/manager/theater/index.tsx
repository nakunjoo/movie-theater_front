import { MainLayout } from "@/layouts/manager/MainLayout";
import { TheaterList } from "@/components/manager/theater/TheaterList";
import type { ReactElement } from "react";
const TheaterMain = () => {
  return <TheaterList />;
};
TheaterMain.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TheaterMain;
