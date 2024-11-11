export type MovieType = {
  id: string;
  title: string;
  genre: string[];
  deliberation: string;
  price: number;
  showtime: number;
  img_url: string;
  status: string;
  open_date: Date | null;
  theater: TheaterType[] | undefined;
};

export type TheaterType = {
  id: string;
  name: string;
  type: string;
  number_seats: number;
  seat: TheaterSeat[] | null;
  createdAt: Date;
  updatedAt: Date;
  screening: ScreeningType[] | undefined;
};

export type TheaterSeat = {
  line: string;
  rows: string[];
};

export type ScreeningType = {
  id: string;
  movie_id: MovieType;
  theater_id: TheaterType;
  kind: string;
  start_time: string;
  end_time: string;
  ready_time: string;
  create: boolean | undefined;
  reservation_amount: number;
};

export type ReservationType = {
  id: string;
  name: string;
  phone: string;
  seat: string[];
  status: string;
  amount: number;
  payment_price: number;
  createdAt: Date;
  screening_id: ScreeningType;
};
