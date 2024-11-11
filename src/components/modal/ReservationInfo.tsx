import { ScreeningType } from "@/lib/types";
import { kindName, Commas } from "@/lib/TypeValue";
import { useState } from "react";

export const ReservationInfo = ({
  screening,
  selectSeat,
  fullPrice,
  setModalView,
  createReservation,
}: {
  screening: ScreeningType | null;
  selectSeat: string[];
  fullPrice: number;
  setModalView: React.Dispatch<React.SetStateAction<boolean>>;
  createReservation: (name: string, phone: string) => void;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div>
      <div
        className="w-full h-full fixed bg-black opacity-70 top-0 left-0 z-10"
        onClick={() => {
          setModalView(false);
        }}
      />
      <div className="w-[400px] h-[400px] bg-white rounded-lg fixed p-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
        <h2 className="text-2xl font-bold border-b-2 border-solid border-red-500">
          예약확인
        </h2>
        <div className="mt-4 border-b-2 border-solid border-red-500">
          <p className="font-bold text-lg">
            {screening?.movie_id.title}{" "}
            {screening?.theater_id ? (
              <span className="font-normal text-base">
                ({kindName(screening.theater_id.type)})
              </span>
            ) : (
              <></>
            )}
          </p>
          <p className="text-stone-500">{screening?.theater_id.name}</p>
          <p className="mt-1 ">
            좌석:{" "}
            {selectSeat.map((seat, index) => {
              return (
                <span key={`reservation-modal-seat-${index}`}>
                  {index === 0 ? <>{seat}</> : <>, {seat}</>}
                </span>
              );
            })}
          </p>
          <p className="flex justify-between">
            <span>결제금액:</span>
            <span className="text-lg">
              <span className="text-red-500 font-bold">
                {Commas(fullPrice)}
              </span>
              원
            </span>
          </p>
        </div>
        <div className="mt-4">
          <input
            className="w-full border border-solid border-black rounded p-2"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="예약자 명"
          />
          <input
            className="w-full mt-2 border border-solid border-black rounded p-2"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            placeholder="휴대폰 번호"
          />
          <button
            className="w-full text-center rounded-lg bg-red-500 text-white p-2 mt-4 text-xl font-bold"
            type="button"
            onClick={() => {
              createReservation(name, phone);
            }}
          >
            예매
          </button>
        </div>
      </div>
    </div>
  );
};
