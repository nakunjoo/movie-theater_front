import { useEffect, useState } from "react";
import { MovieType } from "@/types/manager/Movie";
import { Axios } from "@/lib/Axios";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { MovieGenre, MovieDeliberation } from "@/lib/MovieData";
import { deliverationName } from "@/lib/TypeValue";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale/ko";
import Image from "next/image";
registerLocale("ko", ko);

export const MovieForm = ({
  type,
  movie,
}: {
  type: string;
  movie: MovieType | null;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [deliberation, setDeliberation] = useState("00");
  const [price, setPrice] = useState<string | number>(0);
  const [showtime, setShowtime] = useState<string | number>(0);
  const [openDate, setOpenDate] = useState<Date | null>(new Date());
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const onChangeHandler = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImgUrl(reader?.result as string);
          resolve(true);
        };
      });
    }
  };

  const saveMovie = () => {};

  const updatedMovie = () => {};

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="w-full h-20 text-right">
        {type === "detail" ? (
          <button
            type="submit"
            className="mt-8 bg-purple-600 p-3 text-white font-bold rounded"
            onClick={() => {
              updatedMovie();
            }}
          >
            수정
          </button>
        ) : type === "update" ? (
          <ul className="flex justify-end">
            <li className="mt-8 border border-solid border-purple-600 p-3 font-bold rounded mr-8">
              취소
            </li>
            <li
              className="mt-8 bg-purple-600 p-3 text-white font-bold rounded cursor-pointer"
              onClick={() => {
                saveMovie();
              }}
            >
              저장
            </li>
          </ul>
        ) : (
          <button
            type="submit"
            className="mt-8 bg-purple-600 p-3 text-white font-bold rounded"
            onClick={() => {
              saveMovie();
            }}
          >
            저장
          </button>
        )}
      </div>
      <div className="w-full flex justify-between">
        <div className="w-1/3 relative">
          <div className="2xl:w-[396px] xl:w-[297px] w-[198px] 2xl:h-[568px] xl:h-[426px] h-[284px]  mx-auto absolute top-0 left-1/2 -translate-x-1/2">
            {imgUrl ? (
              <div>
                <Image src={imgUrl} alt="" width={396} height={568} />
              </div>
            ) : (
              <div className="w-full h-full">
                <label
                  className="w-full h-full block rounded cursor-pointer bg-gray-300"
                  htmlFor="movie_none_img"
                >
                  <div className="w-full cursor-pointer text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <Icon
                      className="w-1/2 max-w-32 h-auto max-h-32 mx-auto"
                      icon="uil:image-upload"
                      style={{ color: "#636363" }}
                    />
                    <p className="2xl:text-base text-sm mt-1 text-gray-700">
                      이미지를 업로드 해주세요.
                    </p>
                  </div>
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="movie_none_img"
                  onChange={(e) => {
                    onChangeHandler(e.target.files?.[0] || null);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-2/3">
          <div className="mt-4 w-[85%] mx-auto">
            <h3 className="2xl:text-2xl text-xl font-bold">영화 제목</h3>
            <input
              className="p-2 mt-4 w-full border border-black border-solid border rounded mt-2 text-lg"
              type="text"
              placeholder="영화 제목을 입력해주세요."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mt-6 w-[85%] mx-auto">
            <h3 className="2xl:text-2xl text-xl font-bold">영화 장르</h3>
            <ul className="flex justify-between flex-wrap">
              {MovieGenre.map((genre, index) => {
                return (
                  <li
                    key={`movie-genre-${index}`}
                    className={`w-[18%] my-2 text-center 2xl:text-xl xl:text-lg text-sm text-gray-600 ${
                      genres.includes(genre) ? "font-bold text-purple-700" : ""
                    }`}
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        let clone = [...genres];
                        if (clone.includes(genre)) {
                          clone = clone.filter((value) => value !== genre);
                        } else {
                          clone.push(genre);
                        }
                        setGenres(clone);
                      }}
                    >
                      {genre}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6 w-[85%] mx-auto">
            <h3 className="2xl:text-2xl text-xl font-bold">영화 심의</h3>
            <ul className="flex justify-between flex-wrap">
              {MovieDeliberation.map((data) => {
                return (
                  <li
                    className={`mt-4 text-gray-500 cursor-pointer 2xl:text-xl xl:text-lg text-sm ${
                      data.value === deliberation
                        ? "text-purple-600 font-bold"
                        : ""
                    } ${type === "detail" ? "pointer-events-none" : ""}`}
                    key={`movie-deliberation-${data.value}`}
                    onClick={() => {
                      setDeliberation(data.value);
                    }}
                  >
                    {deliverationName(data.value)}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6 w-[85%] mx-auto">
            <h3 className="2xl:text-2xl text-xl font-bold">상영시간</h3>
            <input
              className="p-2 mt-4 2xl:w-[95%] w-[90%] text-right border border-black border-solid border rounded mt-2 text-lg"
              type="number"
              placeholder="상영시간(분)"
              value={showtime}
              onChange={(e) => {
                setShowtime(e.target.value);
              }}
            />
            <span className="ml-2 text-left inline-block text-xl">분</span>
          </div>
          <div className="mt-6 w-[85%] mx-auto">
            <h3 className="2xl:text-2xl text-xl font-bold">금액</h3>
            <input
              className="p-2 mt-4 2xl:w-[95%] w-[90%] text-right border border-black border-solid border rounded mt-2 text-lg"
              type="number"
              placeholder="금액(원)"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <span className="ml-2 text-left inline-block text-xl">원</span>
          </div>
          <div className="mt-6 w-[85%] mx-auto">
            <h3 className="2xl:text-2xl text-xl font-bold">개봉일</h3>
            <DatePicker
              wrapperClassName="w-full"
              className="p-2 mt-4 2xl:w-[95%] w-[90%] text-gray-600 cursor-pointer text-right border border-black border-solid border rounded mt-2 text-lg"
              selected={openDate}
              onChange={(date) => {
                setOpenDate(date);
              }}
              dateFormat="YYYY년 MM월 dd일"
              locale="ko"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
