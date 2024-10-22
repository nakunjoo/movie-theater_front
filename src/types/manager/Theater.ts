import { MovieType } from "./Movie";
export type TheaterType = {
  id: string;
  name: string;
  type: string;
  number_seats: number;
  seat: TheaterSeat[] | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TheaterSeat = {
  line: string;
  rows: string[];
};

export type ScreeningType = {
  movie_id: MovieType;
  theater_id: TheaterType;
  kind: string;
  start_time: string;
  end_time: string;
  ready_time: string;
  create: boolean | undefined;
};
