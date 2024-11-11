import { MovieType } from "@/lib/types";
import { deliberationImg, kindName } from "@/lib/TypeValue";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";
import { format, isSameDay } from "date-fns";

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

registerLocale("ko", ko);
export const ScreeningList = ({
  screeningList,
  selectDate,
  setSelectDate,
  dateArr,
}: {
  screeningList: MovieType[];
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
  dateArr: Date[] | null;
}) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="w-[80%] mx-auto">
        {dateArr ? (
          <Swiper
            className="absolute top-24"
            spaceBetween={0}
            slidesPerView={5}
            slidesPerGroup={5}
            navigation={true}
            modules={[Navigation]}
          >
            {dateArr.map((date, index) => {
              return (
                <SwiperSlide key={`main-screening-date-${index}`}>
                  <div className="w-[40%] text-center mx-auto">
                    <span
                      className={`text-4xl cursor-pointer ${
                        isSameDay(selectDate, date)
                          ? "text-purple-500 font-bold"
                          : "text-gray-600"
                      }`}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {format(date, "dd")}
                    </span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <DatePicker
            wrapperClassName="w-full"
            className={`p-2 mb-4 mt-12 w-full text-gray-600 cursor-pointer text-right border border-black border-solid border rounded text-lg`}
            selected={selectDate}
            onChange={(date) => {
              if (date) {
                setSelectDate(date);
              }
            }}
            // readOnly={type === "detail" ? true : false}
            dateFormat="YYYY년 MM월 dd일"
            locale="ko"
          />
        )}
        {screeningList.length === 0 ? (
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            해당 날짜에 상영중인 영화가 없습니다.
          </div>
        ) : (
          <div className={`${dateArr ? "mt-36" : "mt-10"}`}>
            {screeningList.map((movie, index) => {
              return (
                <div className="mb-8" key={`screeing-list-${index}`}>
                  <div className="flex justify-start items-nomal">
                    <p className="font-bold mr-1">▶{movie.title}</p>
                    <Image
                      src={deliberationImg(movie.deliberation)}
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
                    {movie.open_date ? (
                      <span className="text-xs mt-1.5 text-gray-500 ml-2">
                        {format(movie.open_date, "yyyy-MM-dd")}개봉
                      </span>
                    ) : (
                      <></>
                    )}
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
                                    className={`${
                                      theater.number_seats -
                                        screening.reservation_amount <=
                                      0
                                        ? "pointer-events-none bg-gray-300"
                                        : ""
                                    } p-2 mr-4 relative cursor-pointer text-center border border-black border-solid rounded`}
                                    onClick={() => {
                                      if (dateArr) {
                                        router.push(
                                          `/screening/seat?id=${screening.id}`
                                        );
                                      } else {
                                        router.push(
                                          `/manager/screening/detail?id=${screening.id}`
                                        );
                                      }
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
                                      {format(screening.start_time, "HH:mm")}
                                    </p>
                                    {theater.number_seats -
                                      screening.reservation_amount >
                                    0 ? (
                                      <p className="text-xs text-blue-700">
                                        {theater.number_seats -
                                          screening.reservation_amount}
                                        /{theater.number_seats}
                                      </p>
                                    ) : (
                                      <p className="text-xs text-red-500">
                                        매진
                                      </p>
                                    )}
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
        )}
      </div>
    </div>
  );
};
