import { ReservationType } from "@/lib/types";
import Image from "next/image";
import { Commas } from "@/lib/TypeValue";
import Link from "next/link";
import { Axios } from "@/lib/Axios";
import { useRouter } from "next/router";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export const ReservationForm = ({
  reservation,
  page,
}: {
  reservation: ReservationType | null;
  page: string;
}) => {
  const router = useRouter();
  const reservationCancel = () => {
    if (!reservation) return;
    Axios.patch("/reservation/cencel", {
      reservation_id: reservation.id,
    })
      .then((res) => {
        if (res.data.success === true) {
          alert("예매가 취소되었습니다.");
          router.push(
            `/reservation/list?name=${reservation.name}&phone=${reservation.phone}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-[60%] mt-20 mx-auto">
      {page === "complete" ? (
        <h3 className="text-center text-4xl font-bold text-stone-700">
          예매가 완료되었습니다!
        </h3>
      ) : (
        <h3 className="text-center text-4xl font-bold text-stone-700">
          예매 상세
        </h3>
      )}
      <div className="mt-10 flex justify-start">
        <div className="w-[35%] p-4 flex justify-end">
          {reservation?.screening_id.movie_id ? (
            <Image
              src={reservation?.screening_id.movie_id.img_url}
              alt=""
              width={322}
              height={461}
            />
          ) : (
            <></>
          )}
        </div>
        {reservation ? (
          <div className="w-[60%] mt-8 p-4">
            <p className="w-full flex justify-between">
              <span className="w-[20%] block">예매번호 :</span>{" "}
              <span className="w-[80%] block font-bold">{reservation.id}</span>
            </p>
            <p className="w-full flex justify-between mt-4">
              <span className="w-[20%] block">영화 :</span>{" "}
              <span className="w-[80%] block font-bold">
                {reservation.screening_id.movie_id.title}
              </span>
            </p>
            <p className="w-full flex justify-between mt-4">
              <span className="w-[20%] block">극장 :</span>{" "}
              <span className="w-[80%] block font-bold">
                {reservation.screening_id.theater_id.name}
              </span>
            </p>
            <p className="w-full flex justify-between mt-4">
              <span className="w-[20%] block">일시 :</span>{" "}
              <span className="w-[80%] block font-bold">
                {dayjs(reservation.screening_id.start_time).format(
                  "YYYY년 MM월 DD일(ddd) HH:mm"
                )}
                {" ~ "}
                {dayjs(reservation.screening_id.end_time).format("HH:mm")}
              </span>
            </p>
            <p className="w-full flex justify-between mt-4">
              <span className="w-[20%] block">인원 :</span>{" "}
              <span className="w-[80%] block font-bold">
                {reservation.amount}명
              </span>
            </p>
            <p className="w-full flex justify-between mt-4">
              <span className="w-[20%] block">좌석 :</span>{" "}
              <span className="w-[80%] block font-bold">
                {reservation.seat.map((seat, index) => {
                  return (
                    <span key={`reservation-form-seat-${index}`}>
                      {index === 0 ? <>{seat}</> : <>, {seat}</>}
                    </span>
                  );
                })}
              </span>
            </p>
            <p className="w-full flex justify-between mt-4">
              <span className="w-[20%] block">결제금액 :</span>{" "}
              <span className="w-[80%] block font-bold">
                <span className=" text-red-500">
                  {Commas(reservation.payment_price)}
                </span>
                원
              </span>
            </p>
            {page === "complete" ? (
              <ul className="mt-8 flex justify-between">
                <li className="w-[45%]">
                  <Link
                    className="block w-full p-6 text-center font-bold text-lg rounded cursor-pointer border border-solid border-black"
                    href={"/"}
                  >
                    돌아가기
                  </Link>
                </li>
                <li className="w-[45%] ">
                  <Link
                    className="block w-full text-center p-6 font-bold text-lg rounded cursor-pointer bg-red-600 text-white"
                    href={"/reservation"}
                  >
                    예매확인
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="mt-8 flex justify-between">
                <li className="w-[45%]">
                  <Link
                    className="block w-full p-6 text-center font-bold text-lg rounded cursor-pointer border border-solid border-black"
                    href={`/reservation/list?name=${reservation.name}&phone=${reservation.phone}`}
                  >
                    예매확인
                  </Link>
                </li>
                {reservation.status === "00" ? (
                  <li className="w-[45%] ">
                    <button
                      type="button"
                      className="block w-full text-center p-6 font-bold text-lg rounded cursor-pointer bg-red-600 text-white"
                      onClick={() => {
                        reservationCancel();
                      }}
                    >
                      예매취소
                    </button>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
