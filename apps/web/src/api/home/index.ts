import request from "@/services/http";
import {
  HomeResourceResponseType,
  DiscoverPublicRequestType,
  DiscoverPublicResponseType,
} from "./type";

enum API {
  HomeList_Get_URL = "/content/home/2image",
  Discover_Post_URL = "/discover/list/select",
}

export const getHomeList = () => {
  return request.get<null, HomeResourceResponseType>(API.HomeList_Get_URL);
};

export const postDiscover = (data: DiscoverPublicRequestType) => {
  return request.post<DiscoverPublicRequestType, DiscoverPublicResponseType>(
    API.Discover_Post_URL,
    data
  );
};
