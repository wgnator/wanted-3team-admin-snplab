import React from "react";
import { addressService } from "../api/axiosInstance";
import { AddressObj, AddressSi, ResponseType } from "../interfaces/types";
import { getMatchCity } from "../service/procAddress";
import { useCache } from "./useCashe";

const regCode = 'regcodes?regcode_pattern'

export default function useAddress(){
  const [siAddress , setSiAddress] = React.useState();
  const [guAddress , setGuAddres] = React.useState();
  const {saveInCache,returnCache} = useCache();

  function setAddresData(set:any,response:object){
    return set(response)
  }

  function getAddressApi() {
    addressService.get(`${regCode}=*00000000`,(response:ResponseType) => {
      setAddresData(setSiAddress,response.data)
      saveInCache("address",response.data)
    })
  }

  function searchAddress (city:string) {
    const reg = returnCache("address")
    setTimeout(()=>{
      const cityType:AddressSi = getMatchCity(reg,city)
      if(cityType === undefined) return addressService.addressError(`'${city}' is not found city`)
      if(reg){
          addressService.get(`${regCode}=${cityType?.code?.substring(0, 2)}*000000`,(response:ResponseType) => {
          setAddresData(setGuAddres,response.data)
          });
        }else{
          getAddressApi(city);
        }
    },100)
  }
    
  return {siAddress,guAddress,getAddressApi,searchAddress}
}