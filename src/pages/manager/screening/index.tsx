import { MainLayout } from "@/layouts/manager/MainLayout";
import { ScreeningList } from "@/components/manager/screening/ScreeningList";
import { useEffect, useState, type ReactElement } from "react";
import { MovieType } from "@/lib/types";

import { Axios } from "@/lib/Axios";

const ScreeningMain = () => {
  const [screeningList, setScreeningList] = useState<MovieType[]>([]);
  const [selectDate, setSelectDate] = useState<Date | null>(new Date());
  useEffect(() => {
    Axios.get(`/screening/date_list?select_date=${selectDate}`).then((res) => {
      console.log(res.data);
      setScreeningList(res.data.data);
    });
  }, [selectDate]);
  return (
    <ScreeningList
      screeningList={screeningList}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
    />
  );
};
ScreeningMain.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ScreeningMain;
