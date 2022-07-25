import { Applicant } from './types';
export type TransportationTypes = '자가용' | '버스' | '지하철' | '택시' | '자전거' | 'KTX/기차' | '전동킥보드' | '도보';

export type Gender = '남' | '여';

export interface Applicant {
  round: number;
  id: number;
  date: string;
  name: string;
  gender: Gender;
  birth: string;
  contact: string;
  email: string;
  transportation: TransportationTypes;
  address: string;
  accepted: boolean;
  order?: number;
}
export interface ResponseType {
  config: object;
  data: object | ApplicantQuery;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}
export enum SearchCategory {
  NAME = 'name',
  DATE = 'date',
  GENDER = 'gender',
  BIRTH = 'birth',
  TRANSPORTATION = 'transportation',
  ADDRESS = 'address',
}
export interface SearchQueryType {
  category: string;
  searchString: string;
}
type regcode = 'code:string' & 'name:stirng';
export interface AddressSi {
  code: string;
  name: string;
}
export interface AddressObj {
  siRegData: {
    code: string;
    name: string;
  };
  dataInsert: any;
  getAddressSi: () => {};
  getAddressGu: any;
}
export type ApplicantQuery = 'all:Applicant' & 'search:Applicant';
// export interface ApplicantQuery {
//   all:Applicant | undefined
//   search:Applicant | undefined,
// }
