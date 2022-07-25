import React from "react";
import { useEffect } from "react";
import useAddress from "../hooks/useAddress"
// import useRegister from "../hooks/useRegister";

export default function TestPage() {
  const {address,getAddress} = useAddress()
  const [test,setTest] = React.useState();
  // const {applicant,applicants,searchData} = useRegister();
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
    // (() => {
    //   address.getSi()
    //   address.getGu("서울")
    // })()
    // getSi();
    console.log("서치 실행");

    // applicant.post(userData)
    // applicant.search(search?.category,search.title)
    // applicant.get()

  },[])
  console.log("테스트",address?.regcodes);
  // console.log("서치 테스트",searchData);
  
  
  return (
    <div>
      <button onClick={(e)=> getAddress(e.target.innerText)}>대전</button>
      <button onClick={(e)=> getAddress(e.target.innerText)}>서울</button>
      <button onClick={(e)=> getAddress(e.target.innerText)}>대구</button>
    </div>
    
  )
}