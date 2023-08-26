import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeonamesService {
  private baseURL = 'http://api.geonames.org/';
  private username = 'lja11202526';

  constructor(private http: HttpClient) {}

  getCountryInfo(countryCode: string) {
    const url = `${this.baseURL}countryInfo?country=${countryCode}&username=${this.username}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
