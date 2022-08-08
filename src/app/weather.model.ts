export interface mainWeather {
  current_observation: detailedWeather;
  forecasts: Array<any>;
  location: Object;
}

export interface detailedWeather {
  astronomy: Object;
  atmosphere: Object;
  condition: conditionWeather;
  pubDate: number;
  wind: Object;
}

export interface conditionWeather {
  code: number;
  text: string;
  temperature: number;
}

export interface necessaryWeather {
  name: string;
  temp: number;
  mainWeather: string;
}
