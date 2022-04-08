export interface ILocation {
    longitude: number,
    latitude: number,
    code: string,
    country: string
}

export interface ICurrent {
    day: string,
    time: string,
    date: string,
    month: string,
    wholeDate: Date,
    offset: number
}

export interface IWeatherData {
    city: string,
    temp: string,
    feels: string,
    description: string,
    icon: string
}

export interface IForecast {
    time: any,
    date: any,
    month: any,
    day: any,
    icon: string,
    temp: number
}