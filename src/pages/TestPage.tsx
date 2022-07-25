import React from "react";
import { useEffect } from "react";
import { errorService } from "../api/axiosInstance";
import useAddress from "../hooks/useAddress"
import useRegister from "../hooks/useRegister";

export default function TestPage() {
  const {siAddress,guAddress,searchAddress,getAddressApi} = useAddress()
  const {postApplicants,applicants,getApplicants,updateApplicants} = useRegister();
  const userData = {
      "round": 1,
      "id": 7,
      "date": "2022-05-11",
      "name": "김석",
      "birth": "1981.12.25",
      "contact": "010-7897-8531",
      "email": "baljang@gmail.com",
      "transportation": "버스",
      "address": "대전광역시",
      "accepted" : true
  }
  const putData = {
      "round": 1,
      "id": 5,
      "date": "2022-07-21",
      "name": "홍길동",
      "birth": "1998.08.21",
      "contact": "010-7897-8531",
      "email": "gildong@gmail.com",
      "transportation": "버스",
      "address": "청주시 청원구",
      "accepted" : true
  }
  const search = {
    category:"address",
    title:"청주시"
  }
  useEffect(()=>{
    getAddressApi();
  },[])
  
  useEffect(()=>{
    console.log("시 테스트",siAddress);
    console.log("구 테스트",guAddress);
    
  },[siAddress,guAddress])
  function clickError () {
    errorService.get("http://abcedeafjqps1038q:2910", (response:responseType)=>{
      console.log("에러쓰",response);
    })
  }
  function postCheck () {
    postApplicants(userData)
  }
  useEffect(()=>{
    console.log("지원자 데이터 테스트",applicants);

  },[applicants])
  // console.log("서치 테스트",searchData);
  const seaData = {
    category:"transportations",
    searchString:"전동킥보드"
  }
  function searchApply(){
    getApplicants(seaData)
  }
  
  return (
    <div>
      <button onClick={(e)=> searchAddress(e.target?.innerText)}>대전</button>
      <button onClick={(e)=> searchAddress(e.target?.innerText)}>서울</button>
      <button onClick={(e)=> searchAddress(e.target?.innerText)}>대구</button>
      <button onClick={(e)=> searchAddress(e.target?.innerText)}>대파</button>
      
      <button onClick={()=>getApplicants()}>지원자 받기</button>
      <button onClick={()=>searchApply()}>지원자 서치</button>
      <button onClick={postCheck}>포스트 보내기</button>
      <button onClick={()=>updateApplicants(10)}>업데이트</button>
    </div>
    
  )
}