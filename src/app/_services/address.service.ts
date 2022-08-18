import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Province } from '../_class/province';
import { Observable } from 'rxjs';
import { City } from '../_class/city';

const BASE_URL = 'http://10.1.137.50:8770';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  constructor(private token: TokenStorageService, private http: HttpClient) { }

  getProvince(): Observable<Province[]> {
    return this.http.get<Province[]>(
      `${BASE_URL}/province/getAll`
    );
  }

  getCity(provinceName: string): Observable<City[]> {
    return this.http.get<City[]>(
      `${BASE_URL}/city/getAll/name?provinceName=${provinceName}`
    );
  }
}
