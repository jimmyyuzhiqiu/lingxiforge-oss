import request from "@/services/http";

export const test = (data: any) => {
  return request.post<any, any>("/user/img", data);
};
