import { Main } from "@/layouts/Main";
import { useRouter } from "next/router";
import { useState, type ReactElement } from "react";
import { phoneNumberSet } from "@/lib/TypeValue";

const Reservation = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full h-full mt-60">
      <div className="w-[30%] mx-auto">
        <h3 className="text-center text-3xl font-bold mb-10">예약 검색</h3>
        <input
          className="w-full border border-solid border-black rounded p-3"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="예약자 명"
        />
        <input
          className="w-full mt-2 border border-solid border-black rounded p-3"
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="휴대폰 번호"
        />
        <button
          className="w-full text-center rounded-lg bg-red-500 text-white p-3 mt-4 text-xl font-bold"
          type="button"
          onClick={() => {
            router.push(
              `/reservation/list?name=${name}&phone=${phoneNumberSet(phone)}`
            );
          }}
        >
          검색
        </button>
      </div>
    </div>
  );
};
Reservation.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};
export default Reservation;
