import { Main } from "@/layouts/Main";
import { ScreeningList } from "@/components/public/ScreeningList";
import { useEffect, useState, type ReactElement } from "react";
import { MovieType } from "@/lib/types";
import { addDays } from "date-fns";

import { Axios } from "@/lib/Axios";

const ScreeningMain = () => {
  const [screeningList, setScreeningList] = useState<MovieType[]>([]);
  const [dateArr, setDateArr] = useState<Date[] | null>(null);
  const [selectDate, setSelectDate] = useState<Date>(new Date());

  useEffect(() => {
    const dates = [];
    const lastDay = addDays(new Date(), 9);
    for (let day = new Date(); day <= lastDay; day = addDays(day, 1)) {
      dates.push(day);
    }
    setDateArr(dates);
  }, []);

  useEffect(() => {
    Axios.get(`/screening/date_list?select_date=${selectDate}`).then((res) => {
      setScreeningList(res.data.data);
    });
  }, [selectDate]);

  return (
    <ScreeningList
      screeningList={screeningList}
      selectDate={selectDate}
      setSelectDate={setSelectDate}
      dateArr={dateArr}
    />
  );
};
ScreeningMain.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default ScreeningMain;
