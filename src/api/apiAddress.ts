import { axiosInstance, axiosPromise } from './axiosInstance';
import React from "react";
interface AddressSi {
  code:string,
  name:string
}
interface AddressObj {
    siRegData:AddressSi[],
    getAddressSi:()=>{},
    getAddressGu:any
  
}
export default function apiAddress(){
  const [addressData , setAddressData] = React.useState();
  
  const address:AddressObj = {
    siRegData:[],
    getAddressSi: async function () {
        await axiosInstance.get('https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000').then((siRes:any)=>{
          address.siRegData = siRes.data.regcodes.map((reg:AddressSi)=>{ return {name:reg?.name.substring(0,2),code:reg?.code.substring(0,2)} })
        })
  },
    getAddressGu: function (city:string) {
      if(address.siRegData){
        setTimeout(()=>{
          const cityType:any = address.siRegData?.find((word:AddressSi) => word.name === city)
          axiosInstance.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${cityType?.code}*000000`)
          .then((cityRes:any)=>{
            setAddressData(cityRes.data)
          }).catch((error)=>{
            console.log(error);
          })
        },200)
      }
    }
  }
  return {address,addressData}
}


  // getAddress: function (city?:string) {
  //   axiosInstance.get('https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000').then((siRes)=>{
  //     const cityNames:any[] = [];
  //       siRes.data.regcodes.map((reg:AddressSi)=>{ cityNames.push({city:reg.name.substring(0,2),code:reg.code.substring(0,2) }) })
  //     const cityType:any = cityNames.find((word) => word.city === city)
  //       console.log("시티",cityType);
  //       console.log(cityType.code);
  //     axiosInstance.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${cityType.code}*000000`).then((guRes)=>{
  //       setAddressData(guRes.data)
  //     })
  //   })
  // }