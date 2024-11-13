import { ReservationType } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import { reservationStatus } from "@/lib/TypeValue";
import { useRouter } from "next/router";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";

registerLocale("ko", ko);

export const ReservationList = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  reservationList,
}: {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  reservationList: ReservationType[];
}) => {
  const router = useRouter();
  const [tableData, setTableData] = useState<ReservationType[]>([]);
  const [movieSearch, setMovieSearch] = useState<string>("");
  // const [movieList, setMovieList] = useState<string[]>([]);
  const [nameSearch, setNameSearch] = useState<string>("");

  useEffect(() => {
    const searchArr = [];
    for (const reservation of reservationList) {
      if (reservation.screening_id.movie_id.title.includes(movieSearch)) {
        if (reservation.name.includes(nameSearch)) {
          searchArr.push(reservation);
        }
      }
    }
    setTableData(searchArr);
  }, [movieSearch, nameSearch, reservationList]);

  return (
    <div className="w-[80%] mx-auto mt-2">
      <h3 className="text-xl font-bold">검색</h3>
      <div className="w-full flex justify-between">
        <div className="w-[50%] flex justify-between mt-2 px-8 border-r border-solid border-black">
          <div className="w-[65%] mx-auto">
            <p>영화제목</p>
            <div className="w-[80%]">
              <input
                type="text"
                value={movieSearch}
                onChange={(e) => {
                  setMovieSearch(e.target.value);
                }}
                className="w-full border border-solid border-black rounded p-2"
              />
            </div>
          </div>
          <div className="w-[35%] mx-auto">
            <p>예약자 명</p>
            <div className="w-full">
              <input
                type="text"
                value={nameSearch}
                onChange={(e) => {
                  setNameSearch(e.target.value);
                }}
                className="w-full border border-solid border-black rounded p-2"
              />
            </div>
          </div>
        </div>
        <div className="w-[50%] flex justify-between mt-2 px-8">
          <div className="w-[45%] mx-auto">
            <p>시작일</p>
            <DatePicker
              wrapperClassName="w-full"
              className={`p-2 w-[100%] mb-4 text-gray-600 cursor-pointer text-right border border-black border-solid border rounded text-lg`}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              maxDate={new Date()}
              dateFormat="YYYY년 MM월 dd일"
              locale="ko"
            />
          </div>

          <span className="block text-center w-[10%] text-4xl mt-7">~</span>
          <div className="w-[45%] mx-auto">
            <p>종료일</p>
            <DatePicker
              wrapperClassName="w-full"
              className={`p-2 w-[100%] mb-4 text-gray-600 cursor-pointer text-right border border-black border-solid border rounded text-lg`}
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
              maxDate={new Date()}
              dateFormat="YYYY년 MM월 dd일"
              locale="ko"
            />
          </div>
        </div>
      </div>
      <div className="reservationTableWrap">
        <table>
          <thead>
            <tr>
              <th>영화제목</th>
              <th>상영관</th>
              <th>예약자명</th>
              <th>상태</th>
              <th>상영일</th>
              <th>예매일</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((reservation, index) => {
              return (
                <tr
                  key={`reservation-list-table-${index}`}
                  onClick={() => {
                    router.push(
                      `/manager/reservation/detail?id=${reservation.id}`
                    );
                  }}
                >
                  <td>{reservation.screening_id.movie_id.title}</td>
                  <td>{reservation.screening_id.theater_id.name}</td>
                  <td>{reservation.name}</td>
                  <td
                    className={`${
                      reservation.status === "20"
                        ? "text-red-500"
                        : "text-stone-700"
                    }`}
                  >
                    {reservationStatus(reservation.status)}
                  </td>
                  <td>
                    {dayjs(reservation.screening_id.start_time).format(
                      "YY년 MM월 DD일 HH시 mm분"
                    )}
                  </td>
                  <td>
                    {dayjs(reservation.createdAt).format("YY년 MM월 DD일")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
