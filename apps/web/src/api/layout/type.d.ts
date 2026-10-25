type publicResponseType<T> = {
  code: number;
  message: string;
  success: boolean;
  data: T;
};

/**
 * community-waterfull
 */
interface waterfullItemType {
  cover: string;
  shelfDate: string;
  avatar: string;
  username: string;
}

export type waterfullResponseType = publicResponseType<waterfullItemType[]>;
