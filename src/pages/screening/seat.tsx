import { Main } from "@/layouts/Main";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactElement } from "react";
import { Axios } from "@/lib/Axios";
import { ScreeningType } from "@/lib/types";
import { MovieSeat } from "@/components/movie/MovieSeat";

const ScreeningSeat = () => {
  const [screening, setScreening] = useState<ScreeningType | null>(null);
  const [reservationSeat, setReservationSeat] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;
    Axios.get(`/screening/seat_list?screening_id=${router.query.id}`)
      .then((res) => {
        for (const seat of res.data.data.theater_id.seat) {
          seat.rows = JSON.parse(seat.rows);
        }
        const arr = [];
        for (const reservation of res.data.data.reservation) {
          for (const seat of reservation.seat) {
            arr.push(seat);
          }
        }
        setScreening(res.data.data);
        setReservationSeat(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return <MovieSeat screening={screening} reservationSeat={reservationSeat} />;
};
ScreeningSeat.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default ScreeningSeat;
