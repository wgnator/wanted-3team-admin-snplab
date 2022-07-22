import React from 'react';
import { axiosInstance,axiosPromise } from "../api/axiosInstance";
import { Applicant } from '../interfaces/types';
export default function useRegister() {
  const [applicants,setApplicants] = React.useState();
  const [searchData,setSearchData] = React.useState();
  const applicant = {
    get: async ()=>{
      await axiosInstance.get("/register")
        .then((getRes)=>{
          console.log("겟 덴" , getRes.data);
          setApplicants(getRes.data);
      })
      .catch((error)=>{
        console.log("겟 에러",error);
      })
    },
    post: async (application:Applicant)=>{
      await axiosInstance.post("/register",application)
      .then((postRes)=>{
        console.log("포스트 덴",postRes.data);
      })
      .catch((error) => {
        console.log("포스트 에러",error.request.status);
      })
    },
    put: (data:any)=>{
      axiosInstance.put("/register",data).then((putRes)=>{
        console.log("풋 덴",putRes.data);
      })
    },
    search:async (category:string,searchString:string|number)=>{

      await axiosInstance.get(`/register?${category}_like=${searchString}`)
      .then((searchRes)=>{
        console.log("서치 덴",searchRes.data);
        setSearchData(searchRes.data)
      })
      .catch((error)=>{
        console.log("서치 에러",error);
      })
    }

  }
    setTimeout(()=>{
      console.log("지원자 데이터",applicants);
    },400)
    
  return {applicant,applicants,searchData}
};