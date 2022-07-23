import { AxiosInstance } from 'axios';

export class HttpRequest<T> {
  constructor(service:AxiosInstance) {
    this.service = service;
  }
  async get(url:string, callback:any) {
    await this.service.get(url).then((_response:any) => {
      // console.log("리스폰스",url,_response);
      if (callback) callback(_response);
      return _response;
    });
  }
  post(url:string, data) {
    this.service.post(url, data);
  }
  patch(url:string, data) {
    this.service.patch(url, data);
  } 
  delete(url:string) {
    this.service.delete(url);
  }
}
