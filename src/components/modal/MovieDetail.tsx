import { MovieType } from "@/lib/types";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { deliberationName, deliberationImg } from "@/lib/TypeValue";
import dayjs from "dayjs";

export const MovieDetail = ({
  setModalView,
  movie,
  setSelectMovie,
}: {
  setModalView: React.Dispatch<React.SetStateAction<boolean>>;
  movie: MovieType | null;
  setSelectMovie: React.Dispatch<React.SetStateAction<MovieType | null>>;
}) => {
  return (
    <div className="relative z-10">
      <div
        className="w-full h-full fixed bg-black opacity-70 top-0 left-0 z-10"
        onClick={() => {
          setModalView(false);
          setSelectMovie(null);
        }}
      />
      <div className="w-[700px] h-[400px] bg-white rounded-lg fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
        <Icon
          className="absolute right-5 top-3 w-8 h-8 cursor-pointer"
          icon="mingcute:close-fill"
          onClick={() => {
            setModalView(false);
            setSelectMovie(null);
          }}
          style={{ color: "#636363" }}
        />
        {movie ? (
          <div className="flex justify-start p-6">
            <div className="w-[45%] relative border-r border-black border-solid flex justify-center">
              <Image
                className="rounded"
                src={movie.img_url}
                alt=""
                width={248}
                height={355}
                unoptimized={true}
              />
              <Image
                className="absolute top-3 left-8"
                src={deliberationImg(movie.deliberation)}
                alt=""
                width={25}
                height={25}
              />
            </div>
            <div className="w-[45%] ml-[3%] text-left">
              <p className="text-2xl mt-8 font-bold">{movie.title}</p>
              <p className="text-lg mt-4">
                {deliberationName(movie.deliberation)}
              </p>
              <p className="text-lg mt-4">
                {movie.genre.map((genre, index) => {
                  return (
                    <span key={`main-movie-modal-genre-${index}`}>
                      {index > 0 ? <>, {genre}</> : <>{genre}</>}
                    </span>
                  );
                })}
              </p>
              <p className="text-lg mt-4">상영시간: {movie.showtime}분</p>
              <p className="text-lg mt-4">
                {dayjs(movie.open_date).format("YYYY년 MM월 DD일")}개봉
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
