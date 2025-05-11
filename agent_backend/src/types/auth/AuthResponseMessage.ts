import { ResponseMessage } from '../common/ResponseMessage';

export type AuthResponseMessage = ResponseMessage & {
  token?: string;
};
