import { ResponseType, SearchQueryType,ApplicantQuery } from './../interfaces/types';
interface getApplicants {
  all:Applicant
  search:Applicant,
}

import React from 'react';
import { registerService } from "../api/axiosInstance";
import { Applicant } from '../interfaces/types';
export default function useRegister() {
  const [applicants,setApplicants] = React.useState<ApplicantQuery | null>(null);
  const [postHandler,setPostHandler] = React.useState(false);
  function getApplicants (query?:SearchQueryType) {
    if(query){
      registerService.get(`?${query.category}_like=${query.searchString}`, (response:ResponseType)=>{
      setApplicants(response.data)
    })
    }else{
      registerService.get("",(response:ResponseType)=>{
      setApplicants(response.data);
    })
    }
  }

  function postApplicants (application:Applicant){
      registerService.get(`?id=${application.id}`,(response:ResponseType)=>{  
      console.log(typeof response.data);
         
      if(response.data.length){
        console.log("겹치는 id가 있습니다");
        setPostHandler(false);
      }else{
        registerService.post("",application)
        setPostHandler(true);
      }
    })
  }
    
  return {getApplicants,postApplicants,applicants,postHandler}
};