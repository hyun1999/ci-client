import { api } from "./config/network";

export const createBoard = async (formData) => {
  const res = await api("boards", "POST", formData);
  return res;
};

export const getBoard = async () => {
  const res = await api("boards", "GET");
  return res;
};
