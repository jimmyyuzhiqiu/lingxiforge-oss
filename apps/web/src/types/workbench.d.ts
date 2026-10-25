type publicType = {
  id: number;
  title: string;
};

/**
 * text to 3d
 */
export type styleListType = publicType;

/**
 *3D print
 */
interface operationListType {
  id: number;
  operationTitle: string;
}

export type optionListResponseType = publicType & {
  radioValue: string;
  operationList: operationListType[];
};

export type formType = {
  name: string;
  phone: string;
  region: string;
  detail: string;
  isAnonymity: boolean;
  courierCompanies: string;
  remark: string;
};
