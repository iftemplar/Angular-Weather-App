import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';
import { detailedWeather, necessaryWeather } from '../weather.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss'],
})
export class WeatherSearchComponent implements OnInit {
  weatherData?: necessaryWeather;
  weatherSubscription?: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  searchWeather(city: string) {
    console.log(city);
    this.weatherSubscription = this.weatherService
      .fetchWeather(city)
      .pipe(
        map((data: detailedWeather) => {
          return { name: data.name, temp: data.main.temp };
        })
      )
      .subscribe((mappedData: necessaryWeather) => {
        console.log(mappedData);
        this.weatherData = mappedData;
      });
  }
}

// *ngIf loader while data is processing
