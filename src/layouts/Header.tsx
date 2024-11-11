import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const MainHeader = () => {
  return (
    <div className="w-full bg-sky-100 text-center relative py-5 clearfix">
      <h1 className="font-bold text-3xl">
        <Link href="/">MOVIE THEATER</Link>
      </h1>
      <ul className="float-right absolute right-10 top-5 flex justify-start">
        <li className="mr-10 cursor-pointer flex justify-start items-center">
          <Link
            href={"/reservation"}
            className="flex justify-start items-center"
          >
            <Icon
              className="w-7 h-7 mr-1"
              icon="tabler:ticket"
              style={{ color: "#636363" }}
            />
            예매 확인
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link href={"/manager"} className="flex justify-start items-center">
            <Icon
              className="w-6 h-6 mr-1"
              icon="grommet-icons:user-manager"
              style={{ color: "#636363" }}
            />
            관리자 로그인
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MainHeader;
