interface publicType {
  id: number;
  title?: string;
  img?: string;
}

/**
 * page introduce
 */
export type IntroduceImgListType = publicType;

/**
 * page start
 */
export type imagesTopListType = publicType;
export type imagesBottomListType = imagesTopListType;

/**
 * page community
 */
export type cardListType = publicType & { username: string; content: string };

export type waterfulListType = {
  cover: string;
  shelfDate: string;
  avatar: string;
  username: string;
};

/**
 * page support
 */
export type brandListType = publicType & { url: string };
