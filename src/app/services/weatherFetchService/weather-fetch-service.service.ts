import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable, timeout} from 'rxjs';
import { ILocation, ICurrent, IWeatherData, IForecast } from './weatherObject';
import { HttpClient } from '@angular/common/http';

const WeatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const WeatherForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const API_KEY = "f427754ed3a2eeae877fa7e31b38c3a1";
const ICON_URL = "https://openweathermap.org/img/wn/";
const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const CITY_JSON = "./assets/data/city.list.json";
const COUNTRY_JSON = "./assets/data/country.json"

@Injectable({
  providedIn: 'root'
})
export class WeatherFetchServiceService {

  Country: any;

  private countryLoad: number = 0; //0: loading 1: done

  private _location: BehaviorSubject<ILocation> = new BehaviorSubject({
    longitude: 112.5,
    latitude: 2.5,
    code: "MY",
    country: "Malaysia"
  });

  location$ = this._location.asObservable();

  private _current: BehaviorSubject<ICurrent> = new BehaviorSubject({
    day: "",
    time: "",
    date: "",
    month: "",
    wholeDate: new Date,
    offset: 0
  });

  current$ = this._current.asObservable();

  private _weatherData: BehaviorSubject<IWeatherData> = new BehaviorSubject({
    city: "",
    temp: "",
    feels: "",
    description: "",
    icon: ""
  }) 

  weatherData$ = this._weatherData.asObservable();

  private _forecast: Subject<IForecast> = new Subject();

  forecast$ = this._forecast.asObservable();

  constructor(private http:HttpClient) {
    this.http.get(COUNTRY_JSON)
                 .subscribe(data => {
                   this.Country = data;
                   this.countryLoad = 1;
                  });
  }

  locationState: number = 0; //ensure users only asked once for location permission

  fetchTime = (offset:number) => {
    let date = new Date();

    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);

    var newDate = new Date(utc + (3600000*offset));

    this._current.next({
      ...this._current.value,
      day: DAY[newDate.getDay()],
      time: newDate.toLocaleTimeString('en-GB'),
      date: ("0" + newDate.getDate()).slice(-2),
      month: MONTH[(newDate.getMonth())],
      wholeDate: newDate,
      offset: offset
    })
  }

  fetchAPI = async (location:any) => {
    let data = await fetch (WeatherBaseUrl + "lat=" + location.latitude + "&lon=" + location.longitude + "&units=metric" + "&appid=" + API_KEY).then(res => res.json())
    .then((res) => {
      this._weatherData.next({
        city: res.name,
        temp: res.main.temp,
        feels: res.main.feels_like,
        description: res.weather[0].description,
        icon: ICON_URL + res.weather[0].icon + ".png"
      })

      this.fetchTime(res.timezone / 60 /60);

      return res;
  })

    let forecastData = await fetch (WeatherForecastUrl + "lat=" + location.latitude + "&lon=" + location.longitude + "&units=metric" + "&appid=" + API_KEY).then(res => res.json());
    this._forecast.next(forecastData.list.filter((item:any) => {
      return (this._current.value.wholeDate < new Date (item.dt_txt))
    }).map((item:any) => {
      let date = new Date (item.dt_txt);
      
      return ({
        time: date.toLocaleTimeString("en-GB", {hour: '2-digit', minute:'2-digit'}),
        date: date.getDate(),
        month: MONTH[(date.getMonth())],
        day: DAY[date.getDay()],
        icon: ICON_URL + item.weather[0].icon + ".png",
        temp: item.main.temp
      })
    }))

    let loadThreshold = 0;

    if (this.countryLoad === 0){
      loadThreshold = await new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 5000)
      }).then(() => {
        return 1
      })
    }

    if (this.countryLoad === 1) {
      this._location.next({
        ...location,
        code: data.sys.country,
        country: this.Country[data.sys.country]
      })
    }
  }

  fetchData() {
    const getLocation = () => new Promise((resolve, rejects) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{

          this._location.next({
            ...this._location.value,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          })
          
          return resolve(this._location.value);
        }, 
        async () => {
          let data = await fetch("https://geolocation-db.com/json/").then(res => res.json()).then((res) => {
            this._location.next({
              ...this._location.value,
              longitude: res.longitude,
              latitude: res.latitude
            })
          })

          return rejects(this._location.value)
        });
      }
      else {
        return rejects(this._location);
      }
    }).then((location:any) => {
      this.fetchAPI(location);
    }).catch((location:any) => {
      this.fetchAPI(location);
    }).finally(() => 
      this.locationState = 1
    )

    if (this.locationState === 1)
      this.fetchAPI(this._location.value);
    else
      getLocation();
  }

  fetchCity(): Observable<any> {
    return this.http.get(CITY_JSON)
  }

  changeLocation(location:any) {
    this.fetchAPI({
      longitude: location.coord.lon,
      latitude: location.coord.lat,
      code: location.country,
      country: this.Country[location.country]
    })
  }
}
