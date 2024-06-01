import { api } from "./config/network";

export const createBoard = async (formData) => {
  const res = await api("api/boards", "POST", formData);
  return res;
};

export const getBoard = async () => {
  const res = await api("api/boards", "GET");
  return res;
};

export const createComment = async (formData) => {
  const res = await api("api/comments", "POST", formData);
  return res;
};

export const getComment = async (postId) => {
  const res = await api(`api/comments/${postId}`, "GET");
  return res;
};
