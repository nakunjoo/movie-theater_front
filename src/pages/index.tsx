import LoginLayout from "@/layouts/LoginLayout";

export default function Home() {
  return (
    <LoginLayout>
      <div className="w-full h-lvh flex justify-center items-center">
        <div className="container text-center flex justify-center">
          <div className="w-[500px] h-[550px] border border-black border-solid rounded">
            <h2 className="text-[50px] mt-8 font-bold">LOGIN</h2>
            <div className="w-[70%] mt-20 mx-auto">
              <input
                type="text"
                className="border border-gray-800 border-solid w-full p-2 text-xl mb-4"
                placeholder="ID"
              />
              <input
                type="password"
                className="border border-gray-800 border-solid w-full p-2 text-xl"
                placeholder="PASSWORD "
              />
            </div>
            <div className="w-[70%] p-6 mt-20 text-2xl text-white font-bold bg-[#9672f8] mx-auto rounded-xl cursor-pointer">
              로그인
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}
