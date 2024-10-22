import { ScreeningType } from "@/types/manager/Theater";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
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
