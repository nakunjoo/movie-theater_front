import { ReservationType } from "@/lib/types";
import {
  deliberationImg,
  kindName,
  Commas,
  reservationStatus,
} from "@/lib/TypeValue";
import Image from "next/image";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export const ReservationListForm = ({
  reservationList,
}: {
  reservationList: ReservationType[] | [];
}) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <h2
        className="text-3xl font-bold text-center
      mt-10"
      >
        예매 확인
      </h2>
      <ul className="w-[60%] mt-20 mx-auto">
        {reservationList.map((reservation, index) => {
          return (
            <li
              key={`reservation-list-${index}`}
              className="mb-12 cursor-pointer"
              onClick={() => {
                router.push(`/reservation/detail?id=${reservation.id}`);
              }}
            >
              <p className="text-right text-lg font-bold">
                예매번호 : <span>{reservation.id}</span>
              </p>
              <div className="w-full p-6 border-4 border-solid border-purple-500 rounded-lg">
                <h3 className="flex justify-between items-center border-b-2 border-solid border-red-600 pb-1">
                  <p className="flex justify-start">
                    <Image
                      src={deliberationImg(
                        reservation.screening_id.movie_id.deliberation
                      )}
                      alt=""
                      width={25}
                      height={25}
                    />
                    <span className="ml-2 text-xl font-bold">
                      {reservation.screening_id.movie_id.title}
                      <span className="text-lg ml-1">
                        ({kindName(reservation.screening_id.theater_id.type)})
                      </span>
                    </span>
                  </p>
                  <p
                    className={`${
                      reservation.status === "00"
                        ? "text-stone-700"
                        : "text-red-500"
                    } font-bold`}
                  >
                    {reservationStatus(reservation.status)}
                  </p>
                </h3>
                <div className="w-[95%] mx-auto mt-4 text-stone-700">
                  <p className="mb-2 flex justify-between">
                    <span className="w-[50%]">
                      상영관:{" "}
                      <span className="font-bold">
                        {reservation.screening_id.theater_id.name}
                      </span>
                    </span>
                    <span className="w-[50%]">
                      관람일:{" "}
                      <span className="font-bold">
                        {dayjs(reservation.screening_id.start_time).format(
                          "YYYY년 MM월 DD일 HH시 mm분"
                        )}
                      </span>
                    </span>
                  </p>
                  <p className="mb-2 flex justify-between">
                    <span className="w-[50%]">
                      좌석:{" "}
                      {reservation.seat.map((seat, i) => {
                        return (
                          <span key={`reservation-list-seat-${i}`}>
                            {i === 0 ? <>{seat}</> : <>, {seat}</>}
                          </span>
                        );
                      })}
                    </span>
                    <span className="w-[50%]">
                      결제금액:{" "}
                      <span className="font-bold text-red-500">
                        {Commas(reservation.payment_price)}
                      </span>
                      원
                    </span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
