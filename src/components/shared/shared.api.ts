import axios from '../../shared/config/axios-interceptor';
import { IUploadResponse } from '../../shared/models/upload.model';

// export const uploadImage = async (image: File) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', image);
//     const { data }: AxiosResponse<{ url: string }> = await axios.post(`files`, formData);
//     return data.url;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// interface IImage {
//   url: string;
// }

// export const uploadPrivateImage = async (image: File) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', image);
//     const { data }: AxiosResponse<IImage> = await axios.post(`files/private`, formData);
//     return data.url;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

const prefixApi = 'attmnt?repositoryId=1002&serverName=103.9.2.7:8050&mimeType=png&description=test.png';

export const uploadImage = async (image: string) => {
  try {

    const data =
      `--*****MessageBoundary*****\r\nContent-Disposition: form-data; filenale="test.png"; name="payload"\r\nContent-Type: application/xml; CHARACTERSET=UTF-8\r\n\r\n<attmnt>\r\n  <repository id="1002"></repository>\r\n  <orig_file_name>test.png</orig_file_name>\r\n  <attmnt_name>test.png</attmnt_name>\r\n  <file_type>png</file_type>\r\n  <description>Upload using REST</description>\r\n</attmnt>\r\n\r\n--*****MessageBoundary*****\r\nContent-Disposition: form-data; name="test.png"\r\nContent-Type: application/octet-stream\r\nContent-Transfer-Encoding: 7bit\r\n\r\n"${image}"\r\n\r\n--*****MessageBoundary*****--`;
    const headers = {
      'Content-Type': 'multipart/form-data; BOUNDARY=*****MessageBoundary*****',
    };
    const response = await axios.post<IUploadResponse>(`${prefixApi}`, `${data}`, { headers });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
