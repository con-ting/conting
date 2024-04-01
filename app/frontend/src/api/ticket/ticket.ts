import tokenInstance from '../../utils/axios/axiosTokenInstance';
import {alertAndLog} from '../../utils/common/alertAndLog';

const ticketUrl: string = '/ticket';

export const ticketQRAPI = async (params: {
  ticket_id: string;
  finger_print: string;
}) => {
  console.log('[ticketQRAPI request] = ', params);
  const res = await tokenInstance.get(
    `${ticketUrl}/${params.ticket_id}?finger_print=${params.finger_print}`,
  );
  console.log('[ticketQRAPI response] = ', res.data);
  return res.data;
};

export const checkQRAPI = async (params: {uuid: string}) => {
  console.log('[checkQRAPI request] = ', params);
  const res = await tokenInstance.get(`${ticketUrl}/qr/${params.uuid}`);
  console.log('[checkQRAPI response] = ', res.data);
  if (res.status === 200) {
    alertAndLog('', res.statusText);
  }
  return res.data;
};
