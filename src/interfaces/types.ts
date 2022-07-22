export type TransportationTypes = '자가용' | '버스' | '지하철' | '택시' | '자전거' | 'KTX/기차' | '전동킥보드' | '도보';

export type Gender = '남' | '여';

export interface Applicant {
  round: number;
  id: number;
  date: Date;
  name: string;
  gender: Gender;
  birth: Date;
  contact: string;
  email: string;
  transportation: TransportationTypes;
  address: string;
  accepted: boolean;
  order?: number;
}
export interface responseType {
  config:object,
  data:object,
  headers:object,
  request:object,
  status:number,
  statusText:string
}
export type SearchCategory = 'name' | 'date' | 'gender' | 'birth' | 'transportation' | 'address';
export interface searchQueryType {
  category: SearchCategory;
  searchString: string;
}
type regcode = "code:string" & "name:stirng"
export interface AddressSi {
    code:string,
    name:string
}
export interface AddressObj {
    siRegData:{
      code:string,
      name:string
    },
    dataInsert:any,
    getAddressSi:()=>{},
    getAddressGu:any
  
}