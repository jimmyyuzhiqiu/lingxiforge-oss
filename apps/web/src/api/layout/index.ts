import request from "@/services/http";
import type { waterfullResponseType } from "./type";

enum API {
  Waterfull_Get_URL = "/content/home/model",
}

export const getWaterfullList = () => {
  return request.get<null, waterfullResponseType>(API.Waterfull_Get_URL);
};
