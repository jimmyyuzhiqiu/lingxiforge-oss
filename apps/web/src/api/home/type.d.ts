interface ResponseType<T> {
  code: number;
  success: boolean;
  msg: string;
  data?: T;
}

/**
 * 首页资源
 */
interface HomeResourceType {
  id: string;
  title: string;
  subTitle: string;
  images: string[];
  path: string;
}

export type HomeResourceResponseType = ResponseType<HomeResourceType[]>;

/**
 * 发现灵感
 */
export interface DiscoverPublicRequestType {
  pageNum: number;
  pageSize: number;
  type: number;
}

type DiscoverPublicCoverItem = {
  userId: string;
  cover: string;
  avatar: string;
  username: string;
  shelfDate: string;
  views: number;
  favorites: number;
};

type PageInfo = {
  pageNum: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type DiscoverPublicItemResponseType = {
  pageInfo: PageInfo;
  coverList: DiscoverPublicCoverItem[];
};

export type DiscoverPublicResponseType =
  ResponseType<DiscoverPublicItemResponseType>;
