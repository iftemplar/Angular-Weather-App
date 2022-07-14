export interface mainWeather {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface weatherInfo {
  description: string;
  icon: string;
  id: number;
  main: string;
}


export interface detailedWeather {
  base: string;
  clouds: Object;
  cod: number;
  coord: Object;
  dt: number;
  id: number;
  main: mainWeather;
  name: string;
  sys: Object;
  timezone: number;
  visibility: number;
  weather: Array<weatherInfo>;
  wind: Object;
}

export interface necessaryWeather {
  name: string;
  temp: number;
  mainWeather: string;
}
