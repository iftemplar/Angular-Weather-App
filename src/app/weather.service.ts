import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  fetchWeather(): Observable<any> {
    return this.http.get(
      'https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus',
      {
        headers: new HttpHeaders({
          'X-RapidAPI-Key': '03aa2894c7msh5f8a1b20eddf27dp19770ejsn6f0c76286d28',
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        }),
        params: { q: 'san francisco,us' },
      }
    );
  }
}
