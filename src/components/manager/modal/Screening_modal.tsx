import { Axios } from "@/lib/Axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieType } from "@/types/manager/Movie";
import { TheaterType, ScreeningTime } from "@/types/manager/Theater";
import { hourList, minList } from "@/lib/TheaterData";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { includeTime } from "@/lib/TypeValue";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";

registerLocale("ko", ko);

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Navigation } from "swiper/modules";
import dayjs from "dayjs";
import { deliverationName, kindName } from "@/lib/TypeValue";

export const ScreeningModal = ({
  setModalView,
  theater,
}: {
  setModalView: React.Dispatch<React.SetStateAction<boolean>>;
  theater: TheaterType | null;
}) => {
  const [movieList, setMovieList] = useState<MovieType[]>([]);
  const [movieIndex, setMovieIndex] = useState(0);
  const [selectMovie, setSelectMovie] = useState<MovieType | null>(null);
  const [selectDate, setSelectDate] = useState<Date | null>(new Date());
  const [selectTime, setSelectTime] = useState<string[]>([]);
  const [timeList, setTimeList] = useState<ScreeningTime[]>([]);

  useEffect(() => {
    Axios.get("/movie/list").then((res) => {
      setMovieList(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (movieList.length > 0) {
      setSelectMovie(movieList[movieIndex]);
    }
  }, [movieList, movieIndex]);

  useEffect(() => {
    setSelectTime([]);
    setTimeList([]);
  }, [selectDate, selectMovie]);

  const timeSelectHeadler = (hour: string, min: string) => {
    const time = `${hour}:${min}`;
    const date = `${dayjs(selectDate).format("YYYY-MM-DD")} ${time}`;
    if (selectMovie) {
      const showtime: ScreeningTime = {
        time,
        start: date,
        end: dayjs(date)
          .add(selectMovie?.showtime, "minute")
          .format("YYYY-MM-DD HH:mm"),
        ready: dayjs(date)
          .add(selectMovie?.showtime + 20, "minute")
          .format("YYYY-MM-DD HH:mm"),
      };

      if (
        includeTime(dayjs(showtime.ready).format("HH:mm"), timeList, selectDate)
      ) {
        alert("앞시간에 상영중인 영화가 존재합니다.");
        return false;
      }

      let clone = [...selectTime];
      let timesClone = [...timeList];
      if (selectTime.includes(time)) {
        clone = clone.filter((value) => value !== time);
        timesClone = timesClone.filter((value) => value.time !== time);
      } else {
        clone.push(time);
        timesClone.push(showtime);
      }
      setSelectTime(clone);
      setTimeList(timesClone);
    }
  };

  return (
    <>
      <div className="w-full h-full fixed bg-black opacity-70 top-0 left-0" />
      <div className="modalWrap">
        <Icon
          className="absolute right-5 top-3 w-8 h-8 cursor-pointer"
          icon="mingcute:close-fill"
          onClick={() => {
            setModalView(false);
          }}
          style={{ color: "#636363" }}
        />
        <div className="flex justify-between py-2">
          <div className="w-[50%] mx-auto relative border-r border-solid border-black">
            <div className="w-[90%]  mt-1.5 mx-auto">
              <div className="2xl:w-[158px] 2xl:h-[220px] w-[154px] h-[214px] border-4 border-solid border-purple-500 absolute left-1/2 -translate-x-1/2 top-0"></div>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                spaceBetween={10}
                slidesPerView={3}
                allowTouchMove={false}
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 50,
                  modifier: 1,
                  slideShadows: true,
                }}
                // loop={true}
                // loopedSlides={2}
                navigation={true}
                slideToClickedSlide={true}
                onSlideChange={(e) => {
                  setMovieIndex(e.activeIndex);
                }}
                modules={[EffectCoverflow, Navigation]}
                className="mySwiper"
              >
                {movieList.map((movie, index) => {
                  return (
                    <SwiperSlide key={`screening-movie-${index}`}>
                      <Image
                        src={movie.img_url}
                        alt=""
                        width={150}
                        height={210}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {selectMovie ? (
              <div className="w-full mt-4">
                <h3 className="2xl:text-2xl text-xl font-bold">영화 정보</h3>
                <ul className="flex justify-start">
                  <li className="w-[45%] mx-auto text-left">
                    <p className="2xl:text-lg text-base mt-1">
                      <span className="w-[20%] inline-block">제목:</span>
                      <span className="w-[80%] inline-block align-middle 2xl:text-base text-sm truncate">
                        {selectMovie.title}
                      </span>
                    </p>
                    <p className="2xl:text-lg text-base mt-1">
                      가격:{" "}
                      <span className="2xl:text-base text-sm">
                        {selectMovie.price}원
                      </span>
                    </p>

                    <p className="2xl:text-lg text-base mt-1">
                      개봉일:{" "}
                      <span className="2xl:text-base text-sm">
                        {dayjs(selectMovie.open_date).format("YY년 MM월 DD일")}
                      </span>
                    </p>
                  </li>
                  <li className="w-[45%] mx-auto text-left">
                    <p className="2xl:text-lg text-base mt-1">
                      심의:{" "}
                      <span className="2xl:text-base text-sm">
                        {deliverationName(selectMovie.deliberation)}
                      </span>
                    </p>
                    <p className="2xl:text-lg text-base mt-1">
                      상영시간:{" "}
                      <span className="2xl:text-base text-sm">
                        {selectMovie.showtime}분
                      </span>
                    </p>
                    <p className="w-full 2xl:text-lg text-base mt-1">
                      <span className="w-[20%] inline-block">장르:</span>
                      <span className="w-[80%] inline-block align-middle 2xl:text-base text-sm truncate">
                        {selectMovie.genre.map((genre, index) => {
                          return (
                            <span key={`screening-movie-genre-${index}`}>
                              {index > 0 ? <>, {genre}</> : <>{genre}</>}
                            </span>
                          );
                        })}
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
            {theater ? (
              <div className="w-full mt-4">
                <h3 className="2xl:text-2xl text-xl font-bold">상영관 정보</h3>
                <div className="w-[95%] mx-auto mt-2">
                  <p className="2xl:text-lg text-base mt-1">
                    상영관 명:{" "}
                    <span className="2xl:text-base text-sm">
                      {theater.name}
                    </span>
                  </p>
                  <p className="2xl:text-lg text-base mt-1">
                    상영관 타입:{" "}
                    <span className="2xl:text-base text-sm">
                      {kindName(theater.type)}
                    </span>
                  </p>
                  <p className="2xl:text-lg text-base mt-1">
                    좌석수:{" "}
                    <span className="2xl:text-base text-sm">
                      {theater.number_seats}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="absolute bottom-0 right-5 w-20 py-2 text-white font-bold text-center bg-purple-500 rounded cursor-pointer">
              생성
            </div>
          </div>
          <div className="w-[50%] mt-4 max-h-[460px] overflow-y-auto p-4  timeWrap">
            <DatePicker
              wrapperClassName="w-full"
              className={`p-2 2xl:w-[95%] w-[90%] mb-4 text-gray-600 cursor-pointer text-right border border-black border-solid border rounded text-lg`}
              selected={selectDate}
              onChange={(date) => {
                setSelectDate(date);
              }}
              minDate={new Date()}
              // readOnly={type === "detail" ? true : false}
              dateFormat="YYYY년 MM월 dd일"
              locale="ko"
            />
            {hourList.map((hour) => {
              return (
                <div className="mb-3" key={`screening-hour-${hour}`}>
                  <h4 className="text-lg font-bold">{hour}시: </h4>
                  {minList.map((min) => {
                    return (
                      <span
                        className={`inline-block cursor-pointer px-3 py-2 mx-1 my-1 border border-solid border-black rounded ${
                          selectTime.includes(`${hour}:${min}`)
                            ? "bg-purple-500 text-white font-bold"
                            : includeTime(
                                `${hour}:${min}`,
                                timeList,
                                selectDate
                              )
                            ? "pointer-events-none bg-gray-400"
                            : ""
                        }`}
                        key={`screening-${hour}-min-${min}`}
                        onClick={() => {
                          timeSelectHeadler(hour, min);
                        }}
                      >
                        {min}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
