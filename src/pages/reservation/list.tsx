import { Main } from "@/layouts/Main";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactElement } from "react";
import { ReservationType } from "@/lib/types";
import { ReservationListForm } from "@/components/reservation/ReservationList";
import { Axios } from "@/lib/Axios";

const ReservationList = () => {
  const router = useRouter();
  const [reservationList, setReservationList] = useState<
    ReservationType[] | []
  >([]);

  useEffect(() => {
    if (!router.query.name || !router.query.phone) return;
    Axios.get(
      `/reservation/list?name=${router.query.name}&phone=${router.query.phone}`
    )
      .then((res) => {
        setReservationList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return (
    <div className="w-full">
      <ReservationListForm reservationList={reservationList} />
    </div>
  );
};
ReservationList.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default ReservationList;
