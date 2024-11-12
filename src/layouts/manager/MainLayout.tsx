// components/common/MainLayout.tsx
import React, { useEffect } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/index";
import { setPath } from "@/stores/slices/manager/pathTitle-slices";

export type menuType = {
  num: number;
  name: string;
  url: string;
};

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const menus: menuType[] = [
    {
      num: 0,
      name: "예매 관리",
      url: "/manager/reservation",
    },
    {
      num: 1,
      name: "상영영화 관리",
      url: "/manager/screening",
    },
    {
      num: 2,
      name: "상영관 관리",
      url: "/manager/theater",
    },
    {
      num: 3,
      name: "영화 관리",
      url: "/manager/movie",
    },
    {
      num: 4,
      name: "고객 관리",
      url: "/manager/customer",
    },
  ];
  useEffect(() => {
    for (const menu of menus) {
      if (router.pathname.includes(menu.url)) {
        let sub: string = "";
        if (router.pathname.includes("add")) {
          sub = "등록";
        } else if (router.pathname.includes("update")) {
          sub = "수정";
        } else if (router.pathname.includes("detail")) {
          sub = "상세";
        }
        if (sub) {
          sub = menu.name.replace("관리", sub);
        }
        dispatch(
          setPath({
            path: router.pathname,
            mainTitle: menu.name,
            mainUrl: menu.url,
            subTitle: sub,
          })
        );
      }
    }
  }, [router]);

  return (
    <div>
      <SideMenu pathName={router.pathname} menus={menus} router={router} />
      <div>
        <Header />
        <div className="mainWrap">{children}</div>
      </div>
    </div>
  );
};
