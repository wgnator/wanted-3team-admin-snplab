import { ResponseType } from './../interfaces/types';
import { AxiosInstance } from 'axios';

export class HttpRequest<T> {
  constructor(private readonly service: AxiosInstance,) {
    this.service = service;
  }
  async get(url:string, callback:any) {
    await this.service.get(url).then((_response:any) => {
      console.log("HttpRequest.get",url,_response);
      if (callback) callback(_response);
      if (url === undefined) this.error(_response.data)
      return _response;
    })
    .catch((error)=>{
      this.error(error)
    })
  }
  post(url:string, data:any) {
    return this.service.post(url, data)
  }
  patch(url:string, data:any) {
    this.service.patch(url, data);
  } 
  delete(url:string) {
    this.service.delete(url);
  }
  error(error:any,msg?:string) {
    throw new Error(`Service Error Status Code : < ${error.response.status} > `, error);
  }
  addressError(errorMsg:string | undefined){
    throw new Error(errorMsg);
  }
}
