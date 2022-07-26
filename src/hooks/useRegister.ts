import { ResponseType, SearchQueryType,ApplicantQuery } from './../interfaces/types';

import React from 'react';
import { registerService } from "../api/axiosInstance";
import { Applicant } from '../interfaces/types';
import { format } from "date-fns";
import { getMultiSearch } from '../service/procRegister';

export default function useRegister() {

  const [applicants,setApplicants] = React.useState<ApplicantQuery | null>(null);
  const [applyLoading,setApplyLoading] = React.useState(true);
  
  // transportation_like=도보
  function getApplicants (query?:SearchQueryType|undefined) {
    if(query){
      registerService.get(`?${getMultiSearch(query)}`, (response:ResponseType)=>{
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
    const postData = {
        ...application,
        date:format(new Date() , "yyyy.MM.dd")
      }
    
    
      registerService.post("",postData).then((response)=>{
      console.log("포스트 성공",response);
      setApplyLoading(false)
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