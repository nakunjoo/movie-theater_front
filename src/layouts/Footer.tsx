import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-gray-900 h-36 p-8 text-gray-400">
      <p className=" text-sm">
        © Copyright 2024 | All Rights Reserved by 나군주
      </p>
      <p className="my-2">email: nkj960822@gmail.com</p>
      <p className="flex justify-start items-center">
        git:{" "}
        <Link
          className="ml-2"
          target="_blank"
          href={"https://github.com/nakunjoo"}
        >
          <Icon
            className="w-6 h-6"
            icon="bi:github"
            style={{ color: "#e5e7eb" }}
          />
        </Link>
      </p>
    </div>
  );
};
export default Footer;
