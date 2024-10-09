import LoginLayout from "@/layouts/manager/LoginLayout";
import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";

import { Axios } from "@/lib/Axios";

const Home = () => {
  const [account_name, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginHandler = () => {
    Axios.post("/auth/login", {
      account_name,
      password,
    })
      .then((res) => {
        console.log("res:", res);
        if (res.data.success === true) {
          Axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.data.token}`;
          window.localStorage.setItem(
            "Authorization",
            `Bearer ${res.data.data.token}`
          );
          router.push("/manager/theater");
        }
      })
      .catch((error) => {
        console.log("error:", error);
        alert("아이디 비밀번호를 확인해주세요.");
      });
  };

  return (
    <div className="w-full h-lvh flex justify-center items-center">
      <div className="container text-center flex justify-center">
        <div className="w-[500px] h-[550px] border border-black border-solid rounded">
          <h2 className="text-[50px] mt-8 font-bold">LOGIN</h2>
          <div className="w-[70%] mt-20 mx-auto">
            <input
              type="text"
              className="border border-gray-800 border-solid w-full p-2 text-xl mb-4"
              placeholder="ID"
              onChange={(e) => {
                setAccountName(e.target.value);
              }}
            />
            <input
              type="password"
              className="border border-gray-800 border-solid w-full p-2 text-xl"
              placeholder="PASSWORD "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div
            className="w-[70%] p-6 mt-20 text-2xl text-white font-bold bg-[#9672f8] mx-auto rounded-xl cursor-pointer"
            onClick={() => {
              loginHandler();
            }}
          >
            로그인
          </div>
        </div>
      </div>
    </div>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
export default Home;
