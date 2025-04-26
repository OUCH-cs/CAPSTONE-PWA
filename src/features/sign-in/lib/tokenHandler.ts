import { ACCESS_TOKEN } from "../sign-in.constants";

const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN);
};

const remooveAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export { setAccessToken, getAccessToken, remooveAccessToken };
