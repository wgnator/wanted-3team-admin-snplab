import { ResponseType, SearchQueryType,ApplicantQuery } from './../interfaces/types';

import React from 'react';
import { registerService } from "../api/axiosInstance";
import { Applicant } from '../interfaces/types';
export default function useRegister() {
  const [applicants,setApplicants] = React.useState<ApplicantQuery | null>(null);
  const [applyLoading,setApplyLoading] = React.useState(true);

  function getApplicants (query?:SearchQueryType) {
    if(query){
      registerService.get(`?${query.category}_like=${query.searchString}`, (response:ResponseType)=>{
      setApplicants(response.data)
      setApplyLoading(false)
    })
    }else{
      registerService.get("",(response:ResponseType)=>{
      setApplicants(response.data);
      setApplyLoading(false)
    })
    }
  }

  function postApplicants (application:Applicant){
      registerService.get(`?id=${application.id}`,(response:ResponseType)=>{  
      console.log(typeof response.data);
      if(response.data.length){
        console.log("겹치는 id가 있습니다");
        setApplyLoading(true)
      }else{
        registerService.post("",application)
        setApplyLoading(false)
      }
    })
  }
  function updateApplicants (id:number,accepted:boolean) {
    registerService.patch(`${id}`,{
      accepted:accepted
    })
    setApplyLoading(false)
  }
  return {getApplicants,postApplicants,applicants,updateApplicants,applyLoading}
};