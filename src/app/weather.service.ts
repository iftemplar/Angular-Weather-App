import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { detailedWeather } from './weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  fetchWeather(city: string): Observable<any> {
    return this.http.get('https://yahoo-weather5.p.rapidapi.com/weather', {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '621243177bmsh540d7449a705dffp121eecjsn4222284fe597',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
      }),
      params: { location: city, u: 'c' },
    });
  }
}
