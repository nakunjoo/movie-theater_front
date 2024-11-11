import { MovieType } from "@/lib/types";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { deliberationName } from "@/lib/TypeValue";
import dayjs from "dayjs";

export const ManagerMovieList = ({ movieList }: { movieList: MovieType[] }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto mt-14">
      <div className="w-full text-right">
        <Link
          href={"/manager/movie/add"}
          className="bg-[#9672f8] p-3 rounded text-base font-bold text-white cursor-pointer"
        >
          + 추가
        </Link>
      </div>
      {movieList.length === 0 ? (
        <div className="text-center text-xl text-gray-500 2xl:mt-72 mt-40">
          현재 등록된 영화가 없습니다.
        </div>
      ) : (
        <div className="w-[80%] mx-auto flex justify-start flex-wrap">
          {movieList.map((movie, index) => {
            return (
              <div
                key={`movie-list-${index}`}
                className="w-[25%] border border-black border-solid rounded text-left p-4 cursor-pointer 2xl:mx-10 mx-5 mb-10"
                onClick={() => {
                  router.push(`/manager/movie/detail?id=${movie.id}`);
                }}
              >
                <div className="w-full">
                  {movie.img_url ? (
                    <Image
                      src={movie.img_url}
                      alt=""
                      width={396}
                      height={568}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-full mt-4">
                  <p className="flex justify-between">
                    <span className="2xl:w-[15%] w-[20%] 2xl:text-lg text-md font-bold">
                      제목
                    </span>
                    <span className="2xl:w-[85%] w-[80%] 2xl:text-base text-sm mt-0.5 text-right block truncate">
                      {movie.title}
                    </span>
                  </p>
                  <p className="flex justify-between mt-2">
                    <span className="2xl:w-[15%] w-[20%] 2xl:text-lg text-md font-bold">
                      장르
                    </span>
                    <span className="2xl:w-[85%] w-[75%] 2xl:text-base text-sm mt-0.5 text-right block truncate">
                      {movie.genre.map((value, index) => {
                        return (
                          <span key={`movie-list-genre-${value}`}>
                            {index > 0 ? <>{`, ${value}`}</> : <>{value}</>}
                          </span>
                        );
                      })}
                    </span>
                  </p>
                  <p className="flex justify-between mt-2">
                    <span className="2xl:w-[15%] w-[20%] 2xl:text-lg text-md font-bold">
                      심의
                    </span>
                    <span className="2xl:w-[85%] w-[80%] 2xl:text-base text-sm mt-0.5 text-right block truncate">
                      {deliberationName(movie.deliberation)}
                    </span>
                  </p>
                  <p className="flex justify-between mt-2">
                    <span className="2xl:w-[15%] w-[20%] 2xl:text-lg text-md font-bold">
                      상영시간
                    </span>
                    <span className="2xl:w-[85%] w-[80%] 2xl:text-base text-sm mt-3 text-right block truncate">
                      {movie.showtime}분
                    </span>
                  </p>
                  <p className="flex justify-between mt-2">
                    <span className="2xl:w-[25%] w-[35%] 2xl:text-lg text-md font-bold">
                      개봉일
                    </span>
                    <span className="2xl:w-[75%] w-[65%] 2xl:text-base text-sm mt-0.5 text-right block truncate">
                      {dayjs(movie.open_date).format("YY년 MM월 DD일")}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
