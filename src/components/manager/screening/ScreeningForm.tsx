import { SeatForm } from "@/components/manager/theater/SeatForm";
import { ScreeningType } from "@/lib/types";
import Image from "next/image";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { setLineData } from "@/lib/TheaterData";
import { deliberationImg, kindName } from "@/lib/TypeValue";
import { Axios } from "@/lib/Axios";
import { useRouter } from "next/router";

export const ScreeningForm = ({
  screening,
  reservationSeat,
}: {
  screening: ScreeningType | null;
  reservationSeat: string[];
}) => {
  const router = useRouter();
  const [lines, setLines] = useState(setLineData);

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

  const deleteScreening = () => {
    const check = confirm("삭제하시겠습니까?");
    if (check) {
      Axios.delete(`/screening/delete?screening_id=${router.query.id}`)
        .then((res) => {
          if (res.data.success) {
            alert("삭제되었습니다.");
            router.push("/manager/screening");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-4">
      <div className="clearfix my-4">
        <button
          className="bg-red-600 float-right p-3 text-white font-bold rounded cursor-pointer mr-8"
          onClick={() => {
            deleteScreening();
          }}
        >
          삭제
        </button>
      </div>
      <div className="2xl:w-[80%] mx-auto flex justify-between">
        {screening?.movie_id ? (
          <div className="w-[50%] flex justify-start border-r border-solid border-black">
            <div className="2xl:w-[198px] w-[148px] 2xl:h-[284px]  h-[213px]">
              <div>
                <Image
                  src={screening?.movie_id.img_url}
                  alt=""
                  width={396}
                  height={568}
                  unoptimized={true}
                />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="2xl:text-2xl text-xl mt-2 font-bold flex justify-start items-center">
                {screening?.movie_id.title}
                <Image
                  className="ml-1"
                  src={deliberationImg(screening?.movie_id.deliberation)}
                  alt=""
                  width={18}
                  height={18}
                />
              </h3>
              <p className="text-xs text-gray-600 tracking-tighter">
                {screening?.movie_id.genre.map((genre, index) => {
                  return (
                    <span key={`screening-detail-genre-${index}`}>
                      {index === 0 ? <>{genre}</> : <>, {genre}</>}
                    </span>
                  );
                })}
              </p>
              <p className="mt-2 text-sm text-stone-800">
                상영시간: {screening.movie_id.showtime}분
              </p>
              <p className="mt-2 text-sm text-stone-800">
                금액: {screening.movie_id.price}원
              </p>
              <p className="mt-2 text-sm text-stone-800">
                개봉일:{" "}
                {dayjs(screening.movie_id.open_date).format("YYYY년 MM월 DD일")}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        {screening?.theater_id ? (
          <div className="w-[50%] mt-2 px-4">
            <div className="mb-8">
              <h2 className="font-bold text-xl">
                상영일
                <span className="ml-3">
                  {dayjs(screening?.start_time).format("YYYY-MM-DD")}
                </span>
              </h2>
              <p className="font-bold text-2xl  flex justify-start items-center">
                <Icon
                  icon="game-icons:sands-of-time"
                  style={{ color: "#9672f8" }}
                />
                {dayjs(screening?.start_time).format("HH:mm")} ~{" "}
                {dayjs(screening?.end_time).format("HH:mm")}
                {/* <span className="font-normal text-sm text-gray-600">
            {" "}
            +20:00(준비시간)
          </span> */}
              </p>
            </div>
            <h3 className="2xl:text-2xl text-xl mt-2 font-bold flex justify-start items-center">
              {screening.theater_id.name}
            </h3>
            <p className="text-xs text-gray-600 tracking-tighter">
              {kindName(screening.theater_id.type)}
            </p>
            <p className="mt-2 text-sm text-stone-800">
              좌석수: {screening.theater_id.number_seats}석
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <SeatForm
          lines={lines}
          type={"detail"}
          lineEvent={() => {}}
          numberSeat={null}
          reservationSeat={reservationSeat}
        />
      </div>
    </div>
  );
};
