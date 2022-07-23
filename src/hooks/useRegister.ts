import { responseType } from './../interfaces/types';


import React from 'react';
import { registerService } from "../api/axiosInstance";
import { Applicant } from '../interfaces/types';
export default function useRegister() {
  const [applicants,setApplicants] = React.useState();
  const [searchData,setSearchData] = React.useState();
  function getApplicants () {
      registerService.get("",(response:responseType)=>{
        setApplicants(response.data);
      })
    }
    function postApplicant (application:Applicant){
       registerService.post("",application)
    }

    function searchApplicant (category:string,searchString:string|number) {
      
       registerService.get(`?${category}_like=${searchString}`, (response:responseType)=>{
        setSearchData(response.data)
       })
        throw new Error('Not implemented.');
    }

  
    setTimeout(()=>{
      console.log("지원자 데이터",applicants);
    },400)
    
  return {getApplicants,postApplicant,searchApplicant,applicants,searchData}
};