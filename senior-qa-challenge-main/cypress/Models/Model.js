class Coord {
    constructor(lon, lat) {
      this.lon = lon;
      this.lat = lat;
    }
  }
  
  class Weather {
    constructor(id, main, description, icon) {
      this.id = id;
      this.main = main;
      this.description = description;
      this.icon = icon;
    }
  }
  
  class Main {
    constructor(temp, feels_like, temp_min, temp_max, pressure, humidity) {
      this.temp = temp;
      this.feels_like = feels_like;
      this.temp_min = temp_min;
      this.temp_max = temp_max;
      this.pressure = pressure;
      this.humidity = humidity;
    }
  }
  
  class Wind {
    constructor(speed, deg) {
      this.speed = speed;
      this.deg = deg;
    }
  }
  
  class Clouds {
    constructor(all) {
      this.all = all;
    }
  }
  
  class Sys {
    constructor(type, id, country, sunrise, sunset) {
      this.type = type;
      this.id = id;
      this.country = country;
      this.sunrise = sunrise;
      this.sunset = sunset;
    }
  }
  
  export default class Root {
    constructor(coord, weather, base, main, visibility, wind, clouds, dt, sys, timezone, id, name, cod) {
      this.coord = coord;
      this.weather = [];
      this.base = base;
      this.main = main;
      this.visibility = visibility;
      this.wind = wind;
      this.clouds = clouds;
      this.dt = dt;
      this.sys = sys;
      this.timezone = timezone;
      this.id = id;
      this.name = name;
      this.cod = cod;
    }
  }
  