/**
 * aside
 */

export interface asideListItemType {
  id: number;
  name: string;
  class: string;
  path: string;
}

export type asideListType = asideListItemType[];

//瀑布流
export type breakPointsConfig = {
  [key: number]: { rowPerView: number };
};
