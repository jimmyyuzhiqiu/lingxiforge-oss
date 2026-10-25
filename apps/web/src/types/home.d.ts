interface publicType {
  id: number;
  title: string;
  path?: string;
}

/**
 * page home
 */
export type ImageAsset = {
  src: string;
  alt: string;
};

export type HomeResourceType = {
  id: string;
  title: string;
  subTitle: string;
  images: ImageAsset[];
  path: string;
};

/**
 * page ideas
 */
type iconfontListItemType = publicType & { icon: string };
export type iconfontListType = iconfontListItemType[];

/**
 * trend/hot/likes/news/starCreator
 */
export type Ideas_Components_DataList_ItemType = {
  userId: string;
  cover: string;
  avatar: string;
  username: string;
  shelfDate: string;
  views: number;
  favorites: number;
  title?: string;
  tags?: string[];
  summary?: string;
};

/**
 * page usercenter
 */
export type BaseUserInfoType = publicType & {
  num: number;
};

type AsyncComponentType = () => Promise<{ default: any }>;

export interface MyWorkListType {
  id: number;
  title: string;
  class: string;
  components: any[];
}

export type modelInfoListType = publicType & {
  content: string;
};

export type buttonListType = publicType & {
  className: string;
};
