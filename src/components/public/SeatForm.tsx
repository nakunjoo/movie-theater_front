import { seatName } from "@/lib/TypeValue";
import { TheaterSeat } from "@/lib/types";

export const SeatForm = ({
  lines,
  type,
  lineEvent,
  numberSeat,
}: {
  lines: { [key: string]: TheaterSeat };
  type: string;
  lineEvent: (line: string, value: string[]) => void | null;
  numberSeat: number | null;
}) => {
  return (
    <div className="w-[800px] h-[500px] mx-auto border border-black border-solid mt-4 ">
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
                  return (
                    <span
                      key={`seat-row-${seat.line}-${i}`}
                      className={`inline-block w-5 h-5 border border-black border-solid cursor-pointer rounded relative ${
                        row === "O" ? "bg-black" : ""
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
                          {seatName(seat.line, seat.rows, i)}
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
