import { MovieType } from "@/types/manager/Movie";
import { useRouter } from "next/router";
import Link from "next/link";
import dayjs from "dayjs";

export const MovieList = ({ movieList }: { movieList: MovieType[] }) => {
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
                className="w-[25%] border border-black border-solid rounded text-left p-4 cursor-pointer mx-10 mb-10"
                onClick={() => {
                  router.push(`/manager/movie/detail?id=${movie.id}`);
                }}
              >
                {"movies"}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
