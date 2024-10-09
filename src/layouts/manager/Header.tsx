import { useSelector } from "react-redux";
import { RootState } from "@/stores/index";
import Link from "next/link";

const Header = () => {
  const pathTitle = useSelector((state: RootState) => state.pathTitleReducer);
  console.log("pathTitle:", pathTitle);
  return (
    <div className="w-full bg-gray-200 h-20">
      <div className="absolute top-10 left-60 text-lg font-bold">
        <Link href={pathTitle.mainUrl}>▶ {pathTitle.mainTitle}</Link>
        {pathTitle.subTitle ? <span>{"sub"}</span> : <></>}
      </div>
    </div>
  );
};

export default Header;
