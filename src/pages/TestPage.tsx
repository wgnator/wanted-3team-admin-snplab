import React from "react";
import { useEffect } from "react";
import { errorService } from "../api/axiosInstance";
import useAddress from "../hooks/useAddress"
import useRegister from "../hooks/useRegister";
import { format } from "date-fns";

export default function TestPage() {
  const {siAddress,guAddress,searchAddress,getAddressApi} = useAddress()
  const {postApplicants,applicants,getApplicants,updateApplicants} = useRegister();
  const userData = {
      "round": 1,
      "name": "김재석",
      "birth": "1968.07.27",
      "contact": "010-1512-1116",
      "email": "sukim@naver.com",
      "transportation": ["자가용"],
      "address": "대전광역시",
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
  console.log("시 테스트",siAddress);
    console.log("구 테스트",guAddress);

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
    category:"birth",
    searchString:"2022.01."
  }
  function searchApply(){
    getApplicants(seaData)
  }
  function getDate(){
    const yyyy = format(new Date() , "yyyy-MM-dd")
    console.log(yyyy);
    
  }
  return (
    <div>
      <button onClick={(e)=> searchAddress(e.target?.innerText)}>대전광역시</button>
      <button onClick={(e)=> searchAddress(e.target?.innerText)}>서울특별시</button>
      <button onClick={(e)=> searchAddress(e.target?.innerText)}>대구광역시</button>
      <button onClick={(e)=> searchAddress(e.target?.innerText)}>대파</button>
      <button onClick={getDate}>오늘의 날짜</button>
      <button onClick={()=>getApplicants()}>지원자 받기</button>
      <button onClick={()=>searchApply()}>지원자 서치</button>
      <button onClick={postCheck}>포스트 보내기</button>
      <button onClick={()=>updateApplicants(10)}>업데이트</button>
    </div>
    
  )
}