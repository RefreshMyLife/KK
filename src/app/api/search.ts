import { wpApi } from "./wp";

export async function searchPosts(query: string) {
  const res = await wpApi.get(`/relevanssi/v1/search?q=${encodeURIComponent(query)}`);
  return res.data;
}