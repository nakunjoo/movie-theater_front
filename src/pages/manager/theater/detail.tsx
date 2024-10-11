import { MainLayout } from "@/layouts/manager/MainLayout";
import { useEffect, useState, type ReactElement } from "react";
import { TheaterForm } from "@/components/manager/theater/TheaterForm";
import { useRouter } from "next/router";
import { Axios } from "@/lib/Axios";
import { TheaterType } from "@/types/manager/Theater";

const TheaterDetail = () => {
  const router = useRouter();
  const [theater, setTheater] = useState<TheaterType | null>(null);

  useEffect(() => {
    if (!router.query.id) return;
    Axios.get(`/theater/detail?theater_id=${router.query.id}`)
      .then((res) => {
        console.log(res.data);
        for (const seat of res.data.data.seat) {
          seat.rows = JSON.parse(seat.rows);
        }
        setTheater(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);
  return <TheaterForm type={"detail"} theater={theater} />;
};
TheaterDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TheaterDetail;
