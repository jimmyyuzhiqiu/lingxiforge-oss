interface ResponseType<T> {
  code: number;
  success: boolean;
  msg: string;
  data?: T;
}

/**
 * 注册
 */
export interface RegisterParamsType {
  email: string;
  password: string;
  code: string;
  codeId: string;
}

export type RegisterResponseType = ResponseType;

/**
 * 登录
 */
export interface LoginParamsType {
  email: string;
  password: string;
  code?: string;
  codeId?: string;
}

export type LoginResponseType = ResponseType<string>;

/**
 * 验证码
 */
interface codeDataType {
  id: string;
  base64: string;
}

export type CodeResponseType = ResponseType<codeDataType>;
