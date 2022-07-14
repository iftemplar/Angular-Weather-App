import { Component, OnInit, OnDestroy } from '@angular/core';
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
    this.weatherSubscription = this.weatherService
      .fetchWeather(city)
      .pipe(
        map((data: detailedWeather) => {
          console.dir(data);
          return { name: data.name,
                   temp: data.main.temp,
                   mainWeather: data.weather[0].main
                 };
        })
      )
      .subscribe((mappedData: necessaryWeather) => {
        console.log(mappedData);
        this.weatherData = mappedData;
      });
  }

  ngOnDestroy() {
    if(this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

}



// *ngIf loader while data is processing
