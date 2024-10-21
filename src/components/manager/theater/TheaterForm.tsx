import { useEffect, useState } from "react";
import { seatName } from "@/lib/TypeValue";
import { setLineData, theaterKind } from "@/lib/TheaterData";
import { Axios } from "@/lib/Axios";
import { useRouter } from "next/router";
import { TheaterType } from "@/types/manager/Theater";
import { ScreeningModal } from "../modal/Screening_modal";

export const TheaterForm = ({
  type,
  theater,
}: {
  type: string;
  theater: TheaterType | null;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("00");
  const [lines, setLines] = useState(setLineData);
  const [numberSeat, setNumberSeat] = useState(0);
  const [modalView, setModalView] = useState(false);

  useEffect(() => {
    if (!theater) {
      setTitle("");
      setKind("00");
      setLines(setLineData);
      return;
    }
    setTitle(theater.name);
    setKind(theater.type);
    if (theater.seat) {
      const clone = { ...lines };
      for (const seat of theater.seat) {
        clone[seat.line].rows = seat.rows;
      }
      setLines(clone);
    }
  }, [theater]);

  useEffect(() => {
    let num: number = 0;
    for (const seat of Object.values(lines)) {
      for (const rows of seat.rows) {
        if (rows === "O") {
          num++;
        }
      }
    }
    setNumberSeat(num);
  }, [lines]);

  const changeLine = (line: string, value: string[]) => {
    const clone = { ...lines };
    clone[line].rows = value;
    setLines(clone);
  };

  const updatedTheater = () => {
    const seat = [];
    for (const line of Object.values(lines)) {
      seat.push(line);
    }
    const theaterData = {
      id: router.query.id,
      name: title,
      type: kind,
      seat,
      number_seats: numberSeat,
    };
    window.localStorage.setItem("updated_theater", JSON.stringify(theaterData));
    router.push(`/manager/theater/update`);
  };

  const saveTheater = () => {
    if (!title) {
      alert("상영관 명을 입력해주세요.");
      return;
    }
    const seat = [];
    for (const line of Object.values(lines)) {
      seat.push(line);
    }
    if (type === "add") {
      Axios.post("/theater/create", {
        name: title,
        type: kind,
        seats: seat,
        number_seats: numberSeat,
      })
        .then((res) => {
          if (res.data.success) {
            alert("저장되었습니다.");
            router.push("/manager/theater");
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    } else if (type === "update") {
      if (!theater) return;
      Axios.patch("/theater/update_detail", {
        id: theater.id,
        name: title,
        type: kind,
        seats: seat,
        number_seats: numberSeat,
      })
        .then((res) => {
          if (res.data.success) {
            alert("저장되었습니다.");
            window.localStorage.setItem("updated_theater", "");
            router.push(`/manager/theater/detail?id=${theater.id}`);
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }
  };

  const deleteTheater = () => {
    const check = confirm("삭제하시겠습니까?");
    if (check) {
      Axios.delete(`/theater/delete?theater_id=${router.query.id}`)
        .then((res) => {
          if (res.data.success) {
            alert("삭제되었습니다.");
            router.push("/manager/theater");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="w-full h-20 text-right">
        {type === "detail" ? (
          <div className="flex justify-between">
            <div
              className="p-3 bg-purple-600 text-white font-bold rounded cursor-pointer"
              onClick={() => {
                setModalView(true);
              }}
            >
              상영영화 등록
            </div>
            <ul className="flex justify-end">
              <li
                className=" bg-red-600 p-3 text-white font-bold rounded cursor-pointer mr-8"
                onClick={() => {
                  deleteTheater();
                }}
              >
                삭제
              </li>
              <li
                className="bg-blue-600 p-3 text-white font-bold rounded cursor-pointer"
                onClick={() => {
                  updatedTheater();
                }}
              >
                수정
              </li>
            </ul>
          </div>
        ) : type === "update" ? (
          <ul className="flex justify-end">
            <li
              className="mt-8 border cursor-pointer border-solid border-purple-600 p-3 font-bold rounded mr-8"
              onClick={() => {
                window.localStorage.setItem("updated_theater", "");
                router.push(`/manager/theater/detail?id=${theater?.id}`);
              }}
            >
              취소
            </li>
            <li
              className="mt-8 bg-purple-600 p-3 text-white font-bold rounded cursor-pointer"
              onClick={() => {
                saveTheater();
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
              saveTheater();
            }}
          >
            저장
          </button>
        )}
      </div>
      <div className="mb-8">
        <h3 className="font-bold text-xl mb-2">상영관 명</h3>
        <input
          className="w-full border border-gray-500 border-solid p-2 rounded text-lg"
          type="text"
          placeholder="상영관 명을 입력해주세요."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          readOnly={type === "detail" ? true : false}
        />
      </div>
      <div className="mb-8">
        <h3 className="font-bold text-xl mb-2">상영관 종류</h3>
        <ul className="flex justify-around">
          {theaterKind.map((data) => {
            return (
              <li
                className={`mt-4 text-gray-500 cursor-pointer text-2xl ${
                  data.value === kind ? "text-purple-600 font-bold" : ""
                } ${type === "detail" ? "pointer-events-none" : ""}`}
                key={`theater-kind-${data.value}`}
                onClick={() => {
                  setKind(data.value);
                }}
              >
                {data.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-xl mb-2">좌석 배치</h3>
        <div className="w-[800px] h-[500px] mx-auto border border-black border-solid mt-4 ">
          <div className="w-[600px] h-[50px] leading-[50px] mx-auto border-l border-r border-b border-black border-solid text-center text-lg font-bold">
            screen
          </div>
          <div className="w-[90%] mx-auto mt-24">
            {Object.values(lines).map((seat, index) => {
              return (
                <div key={`seat-line-${index}`} className="relative">
                  <span className="absolute top-[-3px] left-[-25px] text-sm">
                    {seat.line}
                  </span>
                  <div className="flex justify-between mt-2">
                    {seat.rows.map((row, i) => {
                      return (
                        <span
                          key={`seat-row-${seat.line}-${i}`}
                          className={`inline-block w-5 h-5 border border-black border-solid cursor-pointer rounded relative ${
                            row === "O" ? "bg-black" : ""
                          } ${
                            type === "detail"
                              ? "pointer-events-none border-none"
                              : ""
                          }`}
                          onClick={() => {
                            if (seat.rows[i] === "X") {
                              seat.rows[i] = "O";
                            } else {
                              seat.rows[i] = "X";
                            }
                            changeLine(seat.line, seat.rows);
                          }}
                        >
                          {row === "O" ? (
                            <span className="text-gray-300 text-[10px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                              {seatName(seat.line, seat.rows, i)}
                            </span>
                          ) : (
                            <></>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <span className="absolute top-[-3px] right-[-25px] text-sm">
                    {seat.line}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-right mt-4 mr-3 text-black font-bold">
            좌석수: {numberSeat}
          </p>
        </div>
      </div>
      {modalView ? (
        <ScreeningModal setModalView={setModalView} theater={theater} />
      ) : (
        <></>
      )}
    </div>
  );
};
