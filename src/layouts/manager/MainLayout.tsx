// components/common/MainLayout.tsx
import React, { useEffect } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/index";
import { setPath } from "@/stores/slices/manager/pathTitle-slices";
import styled from "styled-components";

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
      name: "상영관 관리",
      url: "/manager/theater",
    },
    {
      num: 1,
      name: "영화 관리",
      url: "/manager/movie",
    },
    {
      num: 2,
      name: "고객 관리",
      url: "/manager/customer",
    },
  ];
  useEffect(() => {
    if (!router) return;
    if (!router.pathname) return;
    for (const menu of menus) {
      if (menu.url.includes(router.pathname)) {
        dispatch(
          setPath({
            path: router.pathname,
            mainTitle: menu.name,
            mainUrl: menu.url,
            subTitle: null,
          })
        );
      }
    }
  }, [router]);

  return (
    <div>
      <SideMenu pathName={router.pathname} menus={menus} />
      <div>
        <Header />
        <MainWrap className="absolute left-[200px] top-18 p-4 ">
          {children}
        </MainWrap>
      </div>
    </div>
  );
};

const MainWrap = styled.div`
  width: calc(100% - 200px);
`;
