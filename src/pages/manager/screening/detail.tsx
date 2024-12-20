import { MainLayout } from "@/layouts/manager/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactElement } from "react";
import { Axios } from "@/lib/Axios";
import { ScreeningType } from "@/lib/types";
import { ScreeningForm } from "@/components/manager/screening/ScreeningForm";

const ScreeningDetail = () => {
  const [screening, setScreening] = useState<ScreeningType | null>(null);
  const [reservationSeat, setReservationSeat] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;
    Axios.get(`/screening/detail?screening_id=${router.query.id}`)
      .then((res) => {
        for (const seat of res.data.data.theater_id.seat) {
          seat.rows = JSON.parse(seat.rows);
        }
        const seats = [];
        for (const reservation of res.data.data.reservation) {
          for (const seat of reservation.seat) {
            seats.push(seat);
          }
        }
        setScreening(res.data.data);
        setReservationSeat(seats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return (
    <ScreeningForm screening={screening} reservationSeat={reservationSeat} />
  );
};
ScreeningDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ScreeningDetail;
