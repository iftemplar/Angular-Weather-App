import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';
import { mainWeather, necessaryWeather } from '../weather.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss'],
})
export class WeatherSearchComponent implements OnDestroy, AfterViewInit {
  weatherData: necessaryWeather = {
    // initial data needed to allow showing default video BG
    name: '',
    temp: 0,
    mainWeather: '',
  };
  weatherSubscription?: Subscription;

  cities = ['Puerto Natales', 'Madrid', 'Lviv', 'Denver', 'Cape Town', 'Sydney', 'Nuuk', 'Tokyo'];

  weatherBackgrounds = new Map([
    ['default', '../../assets/default.mp4'],
    ['Sunny', '../../assets/sunny.mp4'],
    ['Mostly Sunny', '../../assets/clear.mp4'],
    ['Clear', '../../assets/clear.mp4'],
    ['Mostly Clear', '../../assets/clear.mp4'],
    ['Cloudy', '../../assets/clouds.mp4'],
    ['Partly Cloudy', '../../assets/part-clouds.mp4'],
    ['Breezy', '../../assets/breezy.mp4'],
    ['Showers', '../../assets/rain.mp4'],

    ['Fog', '../../assets/fog.mp4'],
    ['Snow', '../../assets/snow.mp4'],
  ]);

  @ViewChild('video') videoRef!: ElementRef;

  constructor(private weatherService: WeatherService) {}

  ngAfterViewInit() {
    this.videoRef.nativeElement.muted = true;
    this.videoRef.nativeElement.play();
  }

  searchWeather(city: string) {
    this.weatherSubscription = this.weatherService
      .fetchWeather(city)
      .pipe(
        map((data: mainWeather) => {
          console.log(data);
          return {
            name: city,
            temp: data.current_observation.condition.temperature,
            mainWeather: data.current_observation.condition.text,
          };
        })
      )
      .subscribe((mappedData: necessaryWeather) => {
        console.log('mappedData', mappedData);
        this.weatherData = mappedData;
        if (this.weatherBackgrounds.has(this.weatherData.mainWeather)) {
          this.videoRef.nativeElement.src = this.weatherBackgrounds.get(
            this.weatherData.mainWeather
          );
          this.videoRef.nativeElement.load();
        } else {
          this.videoRef.nativeElement.src = this.weatherBackgrounds.get('default');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
