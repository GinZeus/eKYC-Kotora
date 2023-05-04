import { IUser, IUserResponse } from '../../../shared/models/users.model';

export const getUserInfoFromResponse = (response: IUserResponse): IUser | null => {
  try {
    const userId = response.collection_cr.cr['@id'];
    const address = response.collection_cr.cr.zcfg_requester_address;
    const email = response.collection_cr.cr.zcfg_requester_address_email;
    const comboName = response.collection_cr.cr.zcfg_requester_comboname;
    const idCard = response.collection_cr.cr.zcfg_requester_id_passport;
    const phoneNumber = response.collection_cr.cr.zcfg_requester_phone_number;
    return {
      id: userId,
      address,
      email,
      comboName,
      idCard,
      phoneNumber,
    };
  } catch (e) {
    return null;
  }
};
