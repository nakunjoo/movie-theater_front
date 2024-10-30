import axios, { AxiosInstance } from "axios";
// import cookies from 'js-cookie';

let base_url = "";
if (process.env.NODE_ENV === "development") {
  base_url = "http://localhost:3000/api";
} else if (process.env.NODE_ENV === "test") {
  base_url =
    "https://movie-theater-serve-dot-teak-banner-431004-n3.du.r.appspot.com/api";
} else if (process.env.NODE_ENV === "production") {
  base_url =
    "https://movie-theater-serve-dot-teak-banner-431004-n3.du.r.appspot.com/api";
}
console.log("base_url:", base_url);
export const Axios: AxiosInstance = axios.create({
  baseURL: base_url, // 기본 서버 주소 입력
  //   headers: {
  //     access_token: cookies.get('access_token'),
  //   },
});
