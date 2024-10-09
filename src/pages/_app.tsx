import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import React, { useEffect, useLayoutEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Axios } from "@/lib/Axios";
import { store } from "../stores/index";
import { Provider } from "react-redux";

const canUseDOM = typeof window !== "undefined";
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

// 각 페이지에서 불러와서 쓸 '레이아웃 적용된 페이지의 type'
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useIsomorphicLayoutEffect(() => {
    const Authorization = window.localStorage.getItem("Authorization");
    if (Authorization !== undefined) {
      Axios.defaults.headers.common["Authorization"] = Authorization;
    }
  }, []);

  return (
    <main>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </main>
  );
}
