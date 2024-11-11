import { ScreeningType } from "@/lib/types";
import { SeatForm } from "@/components/movie/SeatForm";
import { kindName, Commas, phoneNumberSet } from "@/lib/TypeValue";
import { useEffect, useState } from "react";
import { setLineData } from "@/lib/TheaterData";
import { Axios } from "@/lib/Axios";
import { ReservationInfo } from "../modal/ReservationInfo";
import { useRouter } from "next/router";

export const MovieSeat = ({
  screening,
  reservationSeat,
}: {
  screening: ScreeningType | null;
  reservationSeat: string[];
}) => {
  const router = useRouter();
  const [lines, setLines] = useState(setLineData);
  const [selectSeat, setSelectSeat] = useState<string[]>([]);
  const [fullPrice, setFullPrice] = useState(0);
  const [modalView, setModalView] = useState(false);

  const selectEvent = (value: string) => {
    const clone = [...selectSeat];
    const indexOf = clone.indexOf(value);
    if (indexOf > -1) {
      clone.splice(indexOf, 1);
    } else {
      clone.push(value);
    }
    setSelectSeat(clone);
  };

  useEffect(() => {
    if (!screening) {
      setLines(setLineData);
      return;
    }
    if (screening.theater_id.seat) {
      const clone = { ...lines };
      for (const seat of screening.theater_id.seat) {
        clone[seat.line].rows = seat.rows;
      }
      setLines(clone);
    }
  }, [screening]);

  useEffect(() => {
    let price = 0;
    if (screening?.movie_id) {
      price = screening?.movie_id.price * selectSeat.length;
    }
    setFullPrice(price);
  }, [selectSeat]);

  const createReservation = (name: string, phone: string) => {
    if (!name) {
      alert("예약자 명을 입력해주세요.");
      return false;
    }
    if (!phone) {
      alert("예약자 번호를 입력해주세요.");
      return false;
    }
    const check = confirm("예매 하시겠습니까?.");
    if (check) {
      const user_phone = phoneNumberSet(phone);

      Axios.post("/reservation/create", {
        screening_id: screening?.id,
        seat: selectSeat,
        amount: selectSeat.length,
        name: name,
        phone: user_phone,
        payment_price: fullPrice,
      })
        .then((res) => {
          router.push(`/reservation/complete?id=${res.data.data.id}`);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }
  };

  return (
    <div className="mt-6">
      <div className="w-90%">
        <div className="flex justify-start mb-1">
          <p className="text-xl">{screening?.theater_id.name}</p>
        </div>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">
            {screening?.movie_id.title}
            <span className="text-xl text-gray-500 ml-2 font-normal">
              {screening?.theater_id ? (
                <>{kindName(screening?.theater_id.type)}</>
              ) : (
                <></>
              )}
            </span>
          </h2>
          <p className="text-xl ">
            결제금액:{" "}
            <span className="text-2xl font-bold text-red-600">
              {Commas(fullPrice)}
            </span>
            원
          </p>
        </div>
      </div>
      <SeatForm
        lines={lines}
        selectSeat={selectSeat}
        reservationSeat={reservationSeat}
        selectEvent={selectEvent}
      />
      <div
        className="w-full text-center rounded-lg bg-red-500 text-white p-4 mt-8 text-2xl font-bold cursor-pointer"
        onClick={() => {
          if (selectSeat.length === 0) {
            alert("좌석을 선택해주세요.");
            return false;
          }
          setModalView(true);
        }}
      >
        예매하기
      </div>
      {modalView ? (
        <ReservationInfo
          screening={screening}
          selectSeat={selectSeat}
          fullPrice={fullPrice}
          setModalView={setModalView}
          createReservation={createReservation}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
