import { seatName } from "@/lib/TypeValue";
import { TheaterSeat } from "@/lib/types";

export const SeatForm = ({
  lines,
  selectSeat,
  selectEvent,
  reservationSeat,
}: {
  lines: { [key: string]: TheaterSeat };
  selectSeat: string[];
  reservationSeat: string[];
  selectEvent: (value: string) => void | null;
}) => {
  return (
    <div className="w-[1200px] h-[700px] mx-auto border border-black border-solid mt-4 ">
      <div className="w-[800px] h-[50px] leading-[50px] mx-auto border-l border-r border-b border-black border-solid text-center text-lg font-bold">
        screen
      </div>
      <div className="w-[90%] mx-auto mt-24">
        {Object.values(lines).map((seat, index) => {
          return (
            <div key={`seat-line-${index}`} className="relative">
              <span className="absolute top-[-3px] left-[-25px] text-sm">
                {seat.line}
              </span>
              <div className="flex justify-between mt-3">
                {seat.rows.map((row, i) => {
                  const seat_name = seatName(seat.line, seat.rows, i);
                  return (
                    <span
                      key={`seat-row-${seat.line}-${i}`}
                      className={`inline-block w-8 h-8 rounded relative ${
                        row === "O"
                          ? reservationSeat.includes(seat_name)
                            ? "pointer-events-none bg-gray-600 indent-[-9999px]"
                            : selectSeat.includes(seat_name)
                            ? "bg-orange-400 border border-black border-solid cursor-pointer"
                            : "border border-black border-solid cursor-pointer"
                          : "pointer-events-none"
                      }`}
                      onClick={() => {
                        selectEvent(seat_name);
                      }}
                    >
                      {row === "O" ? (
                        <span className="text-black text-[14px] cursor-pointer absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
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
    </div>
  );
};
