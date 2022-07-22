import React from "react";
import { addressService } from "../api/axiosInstance";
import { AddressObj, AddressSi, responseType } from "../interfaces/types";
import { getMatchCity, putAddressData } from "../service/procAddress";
import { useCache } from "./useCashe";

const regCode = 'regcodes?regcode_pattern'

export default function useAddress(){
  let siRegData:any;

  const {saveInCache,returnCache} = useCache();
  const [address , setAddress] = React.useState();

  function getCache () {
    siRegData = returnCache("address")
    console.log("캐쉬 데이터 저장중 .........",siRegData);
    return;
  }

  function getAddressApi (city:string) {
    console.log("API 데이터 받아오는 중........");
    
    addressService.get(`${regCode}=*00000000`,(response:responseType) => {
      saveInCache("address",response.data)
    } )
    getAddress(city)
    return;
  }

  function getAddress (city:string) {
    getCache();
    setTimeout(()=>{
      if(siRegData){
        console.log("구실행",siRegData,city);
        const cityType:AddressSi = getMatchCity(siRegData,city)
        addressService.get(`${regCode}=${cityType?.code?.substring(0, 2)}*000000`,(response:responseType) => {
          putAddressData(setAddress,response)
        })
      }else{
        getAddressApi(city)
      }
    },100)
    return;
  }
    
  return {address,getAddress}
}