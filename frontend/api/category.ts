import request from "./base";
import { useUser } from "@/stores/user";

export async function getCategoryUser() {
  const user = useUser();
  console.log(user.userId, user.token);
  return await request({
    url: `api/users/${user.userId}/`,
    method: "get",
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}

export async function assiginCategoryToUser(data: number[]) {
  const user = useUser();
  return await request({
    url: `api/users/${user.userId}/`,
    method: "put",
    data: {
      categories: data,
    },
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}
