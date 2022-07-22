import { AddressSi, responseType } from "../interfaces/types"


export function getMatchCity(addressData:any,searchName:string) {
  return addressData?.regcodes?.find((word:AddressSi) => word.name.substring(0,searchName.length) === searchName)
}

export function putAddressData(set:any,resData:responseType) {
  return set(resData.data);
}
