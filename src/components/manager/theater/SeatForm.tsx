import { seatName } from "@/lib/TypeValue";
import { TheaterSeat } from "@/lib/types";

export const SeatForm = ({
  lines,
  type,
  lineEvent,
  numberSeat,
  reservationSeat,
}: {
  lines: { [key: string]: TheaterSeat };
  type: string;
  lineEvent: (line: string, value: string[]) => void | null;
  numberSeat: number | null;
  reservationSeat: string[];
}) => {
  return (
    <div className="w-[800px] h-[500px] relative mx-auto border border-black border-solid mt-4 ">
      {reservationSeat.length > 0 ? (
        <div className="absolute top-16 left-5 text-sm">
          <ul className="flex justify-start">
            <li className="flex justify-start items-center">
              <span>예매완료:</span>
              <span className="ml-1 w-4 h-4 bg-purple-700"></span>
            </li>
            <li className="flex justify-start items-center ml-4">
              <span>예매가능:</span>
              <span className="ml-1 w-4 h-4 bg-black"></span>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
      <div className="w-[600px] h-[50px] leading-[50px] mx-auto border-l border-r border-b border-black border-solid text-center text-lg font-bold">
        screen
      </div>
      <div className="w-[90%] mx-auto mt-24">
        {Object.values(lines).map((seat, index) => {
          return (
            <div key={`seat-line-${index}`} className="relative">
              <span className="absolute top-[-3px] left-[-25px] text-sm">
                {seat.line}
              </span>
              <div className="flex justify-between mt-2">
                {seat.rows.map((row, i) => {
                  const seat_name = seatName(seat.line, seat.rows, i);
                  return (
                    <span
                      key={`seat-row-${seat.line}-${i}`}
                      className={`inline-block w-5 h-5 border border-black border-solid cursor-pointer rounded relative ${
                        row === "O"
                          ? reservationSeat.includes(seat_name)
                            ? "bg-purple-700"
                            : "bg-black"
                          : ""
                      } ${
                        type === "detail"
                          ? "pointer-events-none border-none"
                          : ""
                      }`}
                      onClick={() => {
                        if (seat.rows[i] === "X") {
                          seat.rows[i] = "O";
                        } else {
                          seat.rows[i] = "X";
                        }
                        lineEvent(seat.line, seat.rows);
                      }}
                    >
                      {row === "O" ? (
                        <span className="text-gray-300 text-[10px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                          {seat_name}
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  );
                })}
              </div>
              <span className="absolute top-[-3px] right-[-25px] text-sm">
                {seat.line}
              </span>
            </div>
          );
        })}
      </div>
      {numberSeat ? (
        <p className="text-right mt-4 mr-3 text-black font-bold">
          좌석수: {numberSeat}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};
