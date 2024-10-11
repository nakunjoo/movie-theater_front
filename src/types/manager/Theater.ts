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
