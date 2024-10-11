import { MainLayout } from "@/layouts/manager/MainLayout";
import { TheaterList } from "@/components/manager/theater/TheaterList";
import { useEffect, useState, type ReactElement } from "react";

import { Axios } from "@/lib/Axios";

const TheaterMain = () => {
  const [theaterList, setTheaterList] = useState([]);
  useEffect(() => {
    Axios.get("/theater/list").then((res) => {
      setTheaterList(res.data.data);
    });
  }, []);
  return <TheaterList theaterList={theaterList} />;
};
TheaterMain.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TheaterMain;
