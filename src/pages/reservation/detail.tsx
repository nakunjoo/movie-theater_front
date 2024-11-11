import { Main } from "@/layouts/Main";
import { Axios } from "@/lib/Axios";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactElement } from "react";
import { ReservationType } from "@/lib/types";
import { ReservationForm } from "@/components/reservation/ReservationForm";

const ReservationDetail = () => {
  const router = useRouter();
  const [reservation, setReservation] = useState<ReservationType | null>(null);

  useEffect(() => {
    if (!router.query.id) return;
    Axios.get(`/reservation/detail?reservation_id=${router.query.id}`)
      .then((res) => {
        setReservation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return (
    <div className="w-full">
      <ReservationForm reservation={reservation} page={"detail"} />
    </div>
  );
};

ReservationDetail.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default ReservationDetail;
