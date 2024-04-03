import tokenInstance from '../../utils/axios/axiosTokenInstance';
import {alertAndLog} from '../../utils/common/alertAndLog';

const ticketUrl: string = '/ticket';

export const getTicketListAPI = async () => {
  console.log('[getTicketList resquest]');
  const res = await tokenInstance.get(`${ticketUrl}/my`);
  console.log('[getTicketList response] = ', res.data);
  return res.data.ticket_list;
};

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

export const healthCheckAPI = async (params: {uuid: string}) => {
  console.log('[healthCheckAPI resquest] = ', params);
  const res = await tokenInstance.put(`${ticketUrl}/qr/${params.uuid}`);
  console.log('[heathCheckAPI response]= ', res.data);
  return res.data;
};

export const checkQRAPI = async (params: {url : string}) => {
  console.log('[checkQRAPI request] = ', params);
  const res = await tokenInstance.get(`${params.url}`);
  console.log('[checkQRAPI response] = ', res.data);
  return res.data;
};
