export default function HttpRequest() {
  

  const ErrorHandling = (error:any) => {
    if(error){
      throw new Error(error);
    }
  }
  return {ErrorHandling}
}