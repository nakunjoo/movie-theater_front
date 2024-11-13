import { MovieType } from "@/lib/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { deliberationImg } from "@/lib/TypeValue";
import { useState } from "react";
import { MovieDetail } from "../modal/MovieDetail";

// import required modules
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const MovieList = ({ movieList }: { movieList: MovieType[] | null }) => {
  const [modalView, setModalView] = useState(false);
  const [selectMovie, setSelectMovie] = useState<MovieType | null>(null);
  return (
    <div className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-stone-800 p-8 rounded">
      {movieList ? (
        <div className="movieSwiper">
          <Swiper
            spaceBetween={-35}
            slidesPerView={5}
            navigation={true}
            modules={[Navigation]}
          >
            {movieList.map((movie, index) => {
              return (
                <SwiperSlide key={`main-movie-list-${index}`}>
                  <div className="">
                    <div className="mx-auto  relative flex justify-center">
                      <Image
                        className="rounded cursor-pointer"
                        src={movie.img_url}
                        alt=""
                        width={223}
                        height={320}
                        unoptimized={true}
                        onClick={() => {
                          setSelectMovie(movie);
                          setModalView(true);
                        }}
                      />
                      <Image
                        className="absolute left-24 top-3"
                        src={deliberationImg(movie.deliberation)}
                        alt=""
                        width={30}
                        height={30}
                      />
                    </div>
                    <h3 className="text-lg text-white mt-2 font-bold">
                      {movie.title}
                    </h3>
                    <Link
                      className="w-[230px] mx-auto bg-red-500 block rounded-lg p-2 mt-1 text-white font-bold"
                      href={"/screening"}
                    >
                      예매하기
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div>현재 개봉된 영화가 없습니다.</div>
      )}
      {modalView ? (
        <MovieDetail
          movie={selectMovie}
          setModalView={setModalView}
          setSelectMovie={setSelectMovie}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
