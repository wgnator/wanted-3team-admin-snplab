
export function getMultiSearch (query:any) {
  if(typeof query.searchString === "object"){
    return query?.searchString.map((data:any,index:number)=>{
        if(index+1 === query?.searchString.length){
          return `${query?.category}_like=${data}`
        }else{
          return `${query?.category}_like=${data}&`
        }
      }).join('')
  }else{
    return `${query?.category}_like=${query.searchString}`
  }
}