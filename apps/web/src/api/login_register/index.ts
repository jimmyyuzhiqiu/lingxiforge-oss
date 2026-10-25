import request from "@/services/http";
import {
  RegisterParamsType,
  RegisterResponseType,
  LoginParamsType,
  LoginResponseType,
  CodeResponseType,
} from "./type";

enum API {
  Register_Post_URL = "/register",
  Login_Post_URL = "/login",
  Code_Post_URL = "/code",
}

export const register = (data: RegisterParamsType) => {
  return request.post<RegisterParamsType, RegisterResponseType>(
    API.Register_Post_URL,
    data
  );
};

export const login = (data: LoginParamsType) => {
  return request.post<LoginParamsType, LoginResponseType>(
    API.Login_Post_URL,
    data
  );
};

export const getCode = (data: null) => {
  return request.post<null, CodeResponseType>(API.Code_Post_URL, data);
};
