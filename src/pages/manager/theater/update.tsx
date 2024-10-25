import { MainLayout } from "@/layouts/manager/MainLayout";
import { useEffect, useState, type ReactElement } from "react";
import { TheaterForm } from "@/components/manager/theater/TheaterForm";
import { useRouter } from "next/router";
import { TheaterType } from "@/lib/types";

const TheaterUpdate = () => {
  const router = useRouter();
  const [theater, setTheater] = useState<TheaterType | null>(null);

  useEffect(() => {
    if (!router.query) return;
    const storageData = window.localStorage.getItem("updated_theater");
    if (storageData) {
      const theaterData = JSON.parse(storageData);
      setTheater(theaterData);
    }
  }, [router]);
  return <TheaterForm type={"update"} theater={theater} />;
};
TheaterUpdate.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TheaterUpdate;
