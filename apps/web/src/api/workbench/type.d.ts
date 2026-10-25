interface ResponseType<T> {
  code: number;
  success: boolean;
  msg: string;
  data?: T;
}

/**
 * 图生模型
 */
// interface Img23DParamsType {
//   image: any;
// }

export type Img23DResponseType = ResponseType<any[]>;
