import { createAsyncThunk } from '@reduxjs/toolkit';
import { pickBy } from 'lodash';
import axios from '../../../shared/config/axios-interceptor';
import { IUser, IUserResponse } from '../../../shared/models/users.model';
import { IParams } from '../../../shared/utils/shared-interfaces';

const prefix = 'cr';

export const getEntities = createAsyncThunk(`get-all-${prefix}`, async (fields: IParams | undefined, thunkAPI) => {
  try {
    const params = pickBy(fields);
    return await axios.get<IUser[]>(`${prefix}`, { params });
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getEntity = createAsyncThunk(`get-single-${prefix}`, async (id: string, thunkAPI) => {
  try {
    const { data } = await axios.get<IUser>(`${prefix}/${id}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getUser = createAsyncThunk(
  `get-all-${prefix}`,
  async (fields: { email: string; idCard: string }, thunkAPI) => {
    try {
      const params = `WC=zcfg_requester_id_passport%3D'${fields?.idCard}' and zcfg_requester_address_email%3D'${fields?.email}'`;
      const headers = {
        'X-Obj-Attrs':
          'zcfg_requester_comboname,zcfg_requester_id_passport,zcfg_requester_phone_number,zcfg_requester_address,zcfg_requester_address_email,open_date,id,status,category',
      };
      const userResponse = await axios.get<IUserResponse>(`${prefix}?${params}`, { headers });
      return userResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface IAttachImage {
  imageId: string;
  userId: string;
}

export const attachImageToUser = createAsyncThunk(`attach-single-image`, async (body: IAttachImage, thunkAPI) => {
  try {
    const data = `<lrel_attachments_requests>
    <attmnt id='${body.imageId}'></attmnt>
    <cr id='${body.userId}'></cr>
</lrel_attachments_requests>`;
    const headers = {
      'Content-Type': 'application/xml',
    };
    const response = await axios.post<any>(`lrel_attachments_requests`, `${data}`, { headers });
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// export const getUser = createAsyncThunk(
//   `get-all-${prefix}`,
//   async (fields: { email: string; idCard: string }, thunkAPI) => {
//     try {
//       const userResponse = getUserInfoFromXML(xmlDummy);
//       return userResponse;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateEntity = createAsyncThunk(`update-one-${prefix}`, async (body: IUser, thunkAPI) => {
//   try {
//     const { id } = body;
//     const { data } = await axios.put<IUser>(`${prefix}/${id}`, body);
//     return data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

// export const createEntity = createAsyncThunk(`create-one-${prefix}`, async (body: INewListingType, thunkAPI) => {
//   try {
//     const { data } = await axios.post(`${prefix}`, pickBy(body));
//     return data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

// export const removeEntity = createAsyncThunk(`delete-one-${prefix}`, async (id: string, thunkAPI) => {
//   try {
//     await axios.delete(`${prefix}/${id}`);
//     return id;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });
