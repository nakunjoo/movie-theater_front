import { TheaterType } from "@/types/manager/Theater";
import { kindName } from "@/lib/TypeValue";
import { useRouter } from "next/router";
import Link from "next/link";
import dayjs from "dayjs";

export const TheaterList = ({
  theaterList,
}: {
  theaterList: TheaterType[];
}) => {
  const router = useRouter();
  return (
    <div className="container mx-auto mt-14">
      <div className="w-full text-right">
        <Link
          href={"/manager/theater/add"}
          className="bg-[#9672f8] p-3 rounded text-base font-bold text-white cursor-pointer"
        >
          + 추가
        </Link>
      </div>
      {theaterList.length === 0 ? (
        <div className="text-center text-xl text-gray-500 2xl:mt-72 mt-40">
          현재 등록된 상영관이 없습니다.
        </div>
      ) : (
        <div className="w-[80%] mx-auto flex justify-start flex-wrap">
          {theaterList.map((theater, index) => {
            return (
              <div
                key={`theater-list-${index}`}
                className="w-[25%] border border-black border-solid rounded text-left p-4 cursor-pointer 2xl:mx-10 mx-4 mb-10"
                onClick={() => {
                  router.push(`/manager/theater/detail?id=${theater.id}`);
                }}
              >
                <p className="flex justify-between mb-1">
                  <span className="2xl:text-lg text-base font-bold mr-1">
                    상영관명:
                  </span>
                  {theater.name}
                </p>
                <p className="flex justify-between mb-1">
                  <span className="2xl:text-lg text-base font-bold mr-1">
                    상영관타입:
                  </span>
                  {kindName(theater.type)}
                </p>
                <p className="flex justify-between mb-1">
                  <span className="2xl:text-lg text-base font-bold mr-1">
                    좌석수:
                  </span>
                  {theater.number_seats}
                </p>
                <p className="flex justify-between">
                  <span className="2xl:text-lg text-base font-bold mr-1">
                    생성일:
                  </span>
                  {dayjs(theater.createdAt).format("YY년 MM월 DD일")}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
