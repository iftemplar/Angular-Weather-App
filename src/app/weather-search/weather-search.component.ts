import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss'],
})
export class WeatherSearchComponent implements OnInit {
  weatherSubscription?: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherSubscription = this.weatherService.fetchWeather().subscribe((data) => {
      console.log(data);
    });
  }
}
