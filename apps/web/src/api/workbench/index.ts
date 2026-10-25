import request from "@/services/http";
import type { Img23DResponseType } from "./type";

enum API {
  Img23D_Post_URL = "/model/image",
}

export const getModelAndImg = (data: any) => {
  return request.post<any, Img23DResponseType>(API.Img23D_Post_URL, data);
};
