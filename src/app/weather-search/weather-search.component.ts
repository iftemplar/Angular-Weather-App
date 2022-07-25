import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';
import { detailedWeather, necessaryWeather } from '../weather.model';
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
    ['Clear', '../../assets/clear.mp4'],
    ['Clouds', '../../assets/clouds.mp4'],
    ['Fog', '../../assets/fog.mp4'],
    ['Rain', '../../assets/rain.mp4'],
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
        map((data: detailedWeather) => {
          // console.dir('data', data);
          return { name: data.name, temp: data.main.temp, mainWeather: data.weather[0].main };
        })
      )
      .subscribe((mappedData: necessaryWeather) => {
        // console.log('mappedData', mappedData);
        this.weatherData = mappedData;
        this.videoRef.nativeElement.src = this.weatherBackgrounds.get(this.weatherData.mainWeather);
        this.videoRef.nativeElement.load();
      });
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
