import request from "./base";
import { useUser } from "@/stores/user";

export async function getNews() {
  const user = useUser();
  return await request({
    url: `api/news/`,
    method: "get",
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}

export async function getSingleNew(newId: number) {
  const user = useUser();
  return await request({
    url: `api/news/${newId}/`,
    method: "get",
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}

export async function createNew(data: any) {
  const user = useUser();
  return await request({
    url: `api/news/`,
    method: "post",
    data,
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}

export async function updateNew(newId: number, data: any) {
  const user = useUser();
  return await request({
    url: `api/news/${newId}/`,
    method: "put",
    data,
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}

export async function removeNew(newId: number) {
  const user = useUser();
  return await request({
    url: `api/news/${newId}/`,
    method: "delete",
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}
