export type TheaterType = {
  id: string;
  name: string;
  type: string;
  number_seats: number;
  seats: TheaterSeat[] | null;
  created_at: Date;
  updated_at: Date;
};

export type TheaterSeat = {
  line: string;
  rows: string[];
  created_at: Date;
  updated_at: Date;
};
