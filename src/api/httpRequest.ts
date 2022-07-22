import { AxiosInstance } from 'axios';

export class HttpRequest {
  constructor(service:AxiosInstance) {
    this.service = service;
  }
  async get(url:any, callback:any) {
    await this.service.get(url).then((_response:any) => {
      // console.log("리스폰스",url,_response);
      if (callback) callback(_response);
      return _response;
    });
  }
  post(url, data) {
    this.service.post(url, data);
  }
  patch(url, data) {
    this.service.patch(url, data);
  } 
  delete(url) {
    this.service.delete(url);
  }
}
