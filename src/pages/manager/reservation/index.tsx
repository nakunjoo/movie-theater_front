import { MainLayout } from "@/layouts/manager/MainLayout";
import { Axios } from "@/lib/Axios";
import { useEffect, useState, type ReactElement } from "react";
import { ReservationType } from "@/lib/types";
import dayjs from "dayjs";
import { ReservationList } from "@/components/manager/reservation/reservationList";

const ReservationMain = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(dayjs().subtract(7, "day").format())
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [reservationList, setReservationList] = useState<ReservationType[]>([]);

  useEffect(() => {
    Axios.get(
      `/reservation/manager_date_list?start_date=${dayjs(startDate).format(
        "YYYY-MM-DD"
      )}&end_date=${dayjs(endDate).format("YYYY-MM-DD")}`
    )
      .then((res) => {
        setReservationList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate]);

  return (
    <div>
      <ReservationList
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        reservationList={reservationList}
      />
    </div>
  );
};
ReservationMain.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ReservationMain;
