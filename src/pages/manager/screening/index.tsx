import { MainLayout } from "@/layouts/manager/MainLayout";
import { ScreeningList } from "@/components/public/ScreeningList";
import { useEffect, useState, type ReactElement } from "react";
import { MovieType } from "@/lib/types";

import { Axios } from "@/lib/Axios";

const ScreeningMain = () => {
  const [screeningList, setScreeningList] = useState<MovieType[]>([]);
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  useEffect(() => {
    Axios.get(`/screening/manager_date_list?select_date=${selectDate}`).then(
      (res) => {
        setScreeningList(res.data.data);
      }
    );
  }, [selectDate]);
  return (
    <ScreeningList
      screeningList={screeningList}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      dateArr={null}
    />
  );
};
ScreeningMain.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ScreeningMain;
