import { useEffect, useState } from "react";
import { seatName } from "@/lib/TypeValue";
import { lineData } from "@/lib/TheaterSeat";
import { Axios } from "@/lib/Axios";
import { useRouter } from "next/router";

export const TheaterForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("00");
  const [aLine, setALine] = useState(lineData.A);
  const [bLine, setBLine] = useState(lineData.B);
  const [cLine, setCLine] = useState(lineData.C);
  const [dLine, setDLine] = useState(lineData.D);
  const [eLine, setELine] = useState(lineData.E);
  const [fLine, setFLine] = useState(lineData.F);
  const [gLine, setGLine] = useState(lineData.G);
  const [hLine, setHLine] = useState(lineData.H);
  const [iLine, setILine] = useState(lineData.I);
  const [jLine, setJLine] = useState(lineData.J);
  const [kLine, setKLine] = useState(lineData.K);

  const [numberSeat, setNumberSeat] = useState(0);
  const theaterKind = [
    {
      name: "2D",
      value: "00",
    },
    {
      name: "3D",
      value: "10",
    },
    {
      name: "4D",
      value: "20",
    },
    {
      name: "IMAX",
      value: "30",
    },
  ];

  const seats = [
    aLine,
    bLine,
    cLine,
    dLine,
    eLine,
    fLine,
    gLine,
    hLine,
    iLine,
    jLine,
    kLine,
  ];

  useEffect(() => {
    let num: number = 0;
    for (const seat of seats) {
      for (const rows of seat.rows) {
        if (rows === "O") {
          num++;
        }
      }
    }
    setNumberSeat(num);
  }, [
    aLine,
    bLine,
    cLine,
    dLine,
    eLine,
    fLine,
    gLine,
    hLine,
    iLine,
    jLine,
    kLine,
  ]);

  const changeLine = (line: string, value: string[]) => {
    if (line === "A") {
      const clone = { ...aLine };
      clone.rows = value;
      setALine(clone);
    } else if (line === "B") {
      const clone = { ...bLine };
      clone.rows = value;
      setBLine(clone);
    } else if (line === "C") {
      const clone = { ...cLine };
      clone.rows = value;
      setCLine(clone);
    } else if (line === "D") {
      const clone = { ...dLine };
      clone.rows = value;
      setDLine(clone);
    } else if (line === "E") {
      const clone = { ...eLine };
      clone.rows = value;
      setELine(clone);
    } else if (line === "F") {
      const clone = { ...fLine };
      clone.rows = value;
      setFLine(clone);
    } else if (line === "G") {
      const clone = { ...gLine };
      clone.rows = value;
      setGLine(clone);
    } else if (line === "H") {
      const clone = { ...hLine };
      clone.rows = value;
      setHLine(clone);
    } else if (line === "I") {
      const clone = { ...iLine };
      clone.rows = value;
      setILine(clone);
    } else if (line === "J") {
      const clone = { ...jLine };
      clone.rows = value;
      setJLine(clone);
    } else if (line === "K") {
      const clone = { ...kLine };
      clone.rows = value;
      setKLine(clone);
    }
  };

  const saveTheater = () => {
    if (!title) {
      alert("극장 명을 입력해주세요.");
      return;
    }
    Axios.post("/theater/create", {
      name: title,
      type: kind,
      seats: seats,
      number_seats: numberSeat,
    })
      .then((res) => {
        console.log("res:", res.data);
        if (res.data.success) {
          alert("저장되었습니다.");
          router.push("/manager/theater");
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <div className="w-full h-20 text-right">
        {type === "detail" ? (
          <></>
        ) : type === "update" ? (
          <ul>
            <li></li>
            <li></li>
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
        <h3 className="font-bold text-xl mb-2">극장 명</h3>
        <input
          className="w-full border border-gray-500 border-solid p-2 rounded text-lg"
          type="text"
          placeholder="극장 명을 입력해주세요."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          readOnly={type === "detail" ? true : false}
        />
      </div>
      <div className="mb-8">
        <h3 className="font-bold text-xl mb-2">극장 종류</h3>
        <ul className="flex justify-around">
          {theaterKind.map((data) => {
            return (
              <li
                className={`mt-4 text-gray-500 cursor-pointer text-2xl ${
                  data.value === kind ? "text-purple-600 font-bold" : ""
                }`}
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
            {seats.map((seat, index) => {
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
    </div>
  );
};
