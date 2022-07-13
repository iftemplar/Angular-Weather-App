import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { detailedWeather } from './weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  fetchWeather(): Observable<detailedWeather> {
    return this.http.get<detailedWeather>(
      'https://community-open-weather-map.p.rapidapi.com/weather',
      {
        headers: new HttpHeaders({
          'X-RapidAPI-Key': '621243177bmsh540d7449a705dffp121eecjsn4222284fe597',
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        }),
        params: { q: 'London,uk', units: 'metric' },
      }
    );
  }
}
