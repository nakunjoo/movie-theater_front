import { MovieType } from "@/lib/types";
import { deliverationImg, kindName } from "@/lib/TypeValue";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";
import dayjs from "dayjs";

registerLocale("ko", ko);
export const ScreeningList = ({
  screeningList,
  selectDate,
  setSelectDate,
}: {
  screeningList: MovieType[];
  selectDate: Date | null;
  setSelectDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto">
        <DatePicker
          wrapperClassName="w-full"
          className={`p-2 mb-4 w-full text-gray-600 cursor-pointer text-right border border-black border-solid border rounded text-lg`}
          selected={selectDate}
          onChange={(date) => {
            setSelectDate(date);
          }}
          // readOnly={type === "detail" ? true : false}
          dateFormat="YYYY년 MM월 dd일"
          locale="ko"
        />
        <div className="mt-10">
          {screeningList.map((movie, index) => {
            return (
              <div className="mb-8" key={`screeing-list-${index}`}>
                <div className="flex justify-start items-nomal">
                  <p className="font-bold mr-1">▶{movie.title}</p>
                  <Image
                    src={deliverationImg(movie.deliberation)}
                    alt=""
                    width={18}
                    height={18}
                  />
                  <span className="ml-1 mr-1 mt-1 text-sm text-gray-500">
                    ({movie.showtime}분)
                  </span>
                  {movie.genre.map((genre, i) => {
                    return (
                      <span
                        className="text-sm mt-1"
                        key={`screening-list-${index}-genre-${i}`}
                      >
                        {i === 0 ? <>{genre}</> : <>, {genre}</>}
                      </span>
                    );
                  })}
                  <span className="text-xs mt-1.5 text-gray-500 ml-2">
                    {dayjs(movie.open_date).format("YYYY-MM-DD")}개봉
                  </span>
                </div>
                <div className="mt-2 ml-4">
                  {movie.theater?.map((theater, i) => {
                    return (
                      <div
                        className=" mb-4"
                        key={`screening-list-${index}-theater-${i}`}
                      >
                        <div className="flex justify-start  items-nomal">
                          <p className="text-stone-600">▷{theater.name}</p>
                          <span className="text-sm font-bold text-stone-800 ml-1 mt-1">
                            {kindName(theater.type)}
                          </span>
                          <span className="text-xs text-stone-600 ml-1 mt-1.5">
                            ({theater.number_seats}석)
                          </span>
                        </div>
                        {theater.screening ? (
                          <div className="w-full ml-4 mt-2 flex justify-start items-center">
                            {theater.screening.map((screening, j) => {
                              return (
                                <div
                                  className="p-2 mr-4 relative cursor-pointer text-center border border-black border-solid rounded"
                                  onClick={() => {
                                    router.push(
                                      `/manager/screening/detail?id=${screening.id}`
                                    );
                                  }}
                                  key={`screening-list-${index}-theater-${i}-screen-${j}`}
                                >
                                  {screening.kind === "10" ? (
                                    <Icon
                                      icon="noto-v1:sun"
                                      className="absolute top-0.5 right-0.5 w-3 h-3"
                                    />
                                  ) : screening.kind === "20" ? (
                                    <Icon
                                      icon="meteocons:moon-last-quarter-fill"
                                      className="absolute top-0 right-0 w-4 h-4"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    {dayjs(screening.start_time).format(
                                      "HH:mm"
                                    )}
                                  </p>
                                  <p className="text-xs text-blue-700">
                                    {theater.number_seats}/
                                    {theater.number_seats}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
