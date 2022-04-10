import { Component, OnInit, Renderer2,ElementRef,ViewChild} from '@angular/core';
import { WeatherFetchServiceService } from 'src/app/services/weatherFetchService/weather-fetch-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  private _subscription: any = [];

  @ViewChild('filteredCityWrap') filteredMenu!: ElementRef;
  @ViewChild('locationInput') locationInput!: ElementRef;

  constructor(private _weatherFetchService:WeatherFetchServiceService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      if(e.target!==this.filteredMenu.nativeElement && e.target!==this.locationInput.nativeElement){
          this.filteredShow=0;
          clearTimeout(this.timer);
      }
    });
  }

  weatherData: any;
  current: any;
  forecastObject: any;
  location: any;
  fetchDataInterval: any;
  timeInterval: any;
  filteredCity: any;
  filteredShow: number = 0;
  timer: any;
  
  ngOnInit(): void {
    //subscribers
    this._subscription.push(this._weatherFetchService.location$.subscribe(
      item =>
          this.location = item
    ));

    this._subscription.push(this._weatherFetchService.current$.subscribe(
      item =>
          this.current = item
    ));

    this._subscription.push(this._weatherFetchService.weatherData$.subscribe(
      item =>
        this.weatherData = item
    ));

    this._subscription.push(this._weatherFetchService.forecast$.subscribe(
      item =>
        this.forecastObject = item
    ));


    //functions
    this._weatherFetchService.fetchTime(new Date().getTimezoneOffset()*(-1)/60);

    this.timeInterval = setInterval(() => {
      this._weatherFetchService.fetchTime(this.current.offset);
    }, 1000)

    this._weatherFetchService.fetchData();

    this.fetchDataInterval = setInterval(() => {
      this._weatherFetchService.fetchData();
    }, 60000)
  }

  ngOnDestroy() {
    clearInterval(this.fetchDataInterval);
    clearInterval(this.timeInterval);

    this._subscription.forEach((s:any) => s.unsubscribe())
  }

  onInput(value:string) {

    let exactValue = value;

    value = value.replace(/\s/g, "");

    let regex = new RegExp(value, "i");

    let regexStrict = new RegExp("^" + value, "i");

    if(value.length < 2) {
      this.filteredShow = 2;
      this.filteredCity = [
        {
          country: "Please enter at least 2 characters to search..."
        }
      ]
      return;
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => this._weatherFetchService.fetchCity().subscribe(item => {

      if (value.length > 3) {
        let firstFilter = item.filter((city:any) => {
          return (city.name.replace(/\s/g, "").match(regex) != null)
        })

        let secondFilter = firstFilter.filter((city:any) => {
          return (city.name.replace(/\s/g, "").match(regexStrict) != null)
        })

        let firstSort = secondFilter.sort((a:any, b:any) => a.name.localeCompare(b.name))

        let secondSort = firstFilter.sort((a:any, b:any) => a.name.localeCompare(b.name))

        let filteredSet = new Set([...firstSort, ...secondSort])

        this.filteredCity = [...filteredSet].map((location) => {
          return {
            ...location,
            code: location.country,
            country: this._weatherFetchService.Country[location.country]
          }
        })
      }
      else{
        let firstFilter = item.filter((city:any) => {
          return (city.name.replace(/\s/g, "").match(regexStrict) != null)
        })

        let firstSort = firstFilter.sort((a:any, b:any) => a.name.localeCompare(b.name))

        this.filteredCity = [...firstSort].map((location) => {
          return {
            ...location,
            code: location.country,
            country: this._weatherFetchService.Country[location.country]
          }
        })
      }

      this.filteredShow = 1;

      if (this.filteredCity.length === 0){
        this.filteredShow = 2;
        this.filteredCity = [
          {
            country: "no results found for " + exactValue
          }
        ]
      }

    }), 800)

    if (value === "") {
      this.filteredCity = null;
      clearTimeout(this.timer);
    }
  }

  onClick(location:any) {
    this.filteredShow = 0;
    (<HTMLInputElement>document.getElementById("currentCity")).value = location.name;
    this._weatherFetchService.changeLocation(location);
  }
}