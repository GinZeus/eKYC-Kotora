export interface IUser {
  id: string;
  address: string;
  email: string;
  comboName: string;
  idCard: string;
  phoneNumber: string;
}

export interface Link {
  '@href': string;
  '@rel': string;
}

export interface Link2 {
  '@href': string;
  '@rel': string;
}

export interface Category {
  '@id': number;
  '@REL_ATTR': string;
  '@COMMON_NAME': string;
  link: Link2;
}

export interface Link3 {
  '@href': string;
  '@rel': string;
}

export interface Status {
  '@id': number;
  '@REL_ATTR': string;
  '@COMMON_NAME': string;
  link: Link3;
}

export interface Cr {
  '@id': string;
  '@REL_ATTR': string;
  '@COMMON_NAME': number;
  link: Link;
  category: Category;
  open_date: number;
  status: Status;
  zcfg_requester_address: string;
  zcfg_requester_address_email: string;
  zcfg_requester_comboname: string;
  zcfg_requester_id_passport: string;
  zcfg_requester_phone_number: string;
}

export interface CollectionCr {
  '@COUNT': number;
  '@START': number;
  '@TOTAL_COUNT': number;
  cr: Cr;
}

export interface IUserResponse {
  collection_cr: CollectionCr;
}
