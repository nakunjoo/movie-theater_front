import { MainLayout } from "@/layouts/manager/MainLayout";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactElement } from "react";
import { Axios } from "@/lib/Axios";
import { ScreeningType } from "@/lib/types";
import { ScreeningForm } from "@/components/manager/screening/ScreeningForm";

const ScreeningDetail = () => {
  const [screening, setScreening] = useState<ScreeningType | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;
    Axios.get(`/screening/detail?screening_id=${router.query.id}`)
      .then((res) => {
        for (const seat of res.data.data.theater_id.seat) {
          seat.rows = JSON.parse(seat.rows);
        }
        setScreening(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return <ScreeningForm screening={screening} />;
};
ScreeningDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ScreeningDetail;
