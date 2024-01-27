import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient:HttpClient) { }

  getData(){
    let url = environment.User.BASE_URL + environment.User.getData
    return this.httpClient.get(url)
  }

  addData(data:object){
    let url = environment.User.BASE_URL + environment.User.addUser
    return this.httpClient.post(url,data)
  }

  editData(data:object){
    console.log('data');
    
    let url = environment.User.BASE_URL + environment.User.editUser
    return this.httpClient.post(url, data)
  }
}
