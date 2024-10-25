import { ScreeningType } from "@/lib/types";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import deliver_all from "../../public/movie_deliberation_all.svg";
import deliver_12 from "../../public/movie_deliberation_12.svg";
import deliver_15 from "../../public/movie_deliberation_15.svg";
import deliver_19 from "../../public/movie_deliberation_19.svg";
dayjs.extend(isBetween);

export const kindName = (type: string) => {
  let str = "";
  switch (type) {
    case "00":
      str = "2D";
      break;
    case "10":
      str = "3D";
      break;
    case "20":
      str = "4D";
      break;
    case "30":
      str = "IMAX";
      break;
  }
  return str;
};

export const deliverationName = (type: string) => {
  let str = "";
  switch (type) {
    case "00":
      str = "전체관람가";
      break;
    case "10":
      str = "12세이상관람가";
      break;
    case "20":
      str = "15세이상관람가";
      break;
    case "30":
      str = "청소년관람불가";
      break;
  }
  return str;
};

export const deliverationImg = (type: string) => {
  let str = "";
  switch (type) {
    case "00":
      str = deliver_all;
      break;
    case "10":
      str = deliver_12;
      break;
    case "20":
      str = deliver_15;
      break;
    case "30":
      str = deliver_19;
      break;
  }
  return str;
};

export const seatName = (name: string, line: string[], index: number) => {
  let count = 0;
  let str = "";
  for (let i = 0; i <= index; i++) {
    if (line[i] === "O") {
      count += 1;
    }
  }

  if (count > 0) {
    str = `${name}${count}`;
  }
  return str;
};

export const includeTime = (date: string, screeningList: ScreeningType[]) => {
  for (const screening of screeningList) {
    const start = dayjs(screening.start_time).format("YYYY-MM-DD HH:mm");
    const end = dayjs(screening.ready_time).format("YYYY- MM-DD HH:mm");

    if (date === start) {
      return true;
    }
    if (dayjs(date).isBetween(start, end)) {
      return true;
    }
  }
  return false;
};
