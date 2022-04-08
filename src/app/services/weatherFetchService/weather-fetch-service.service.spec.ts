import { TestBed } from '@angular/core/testing';

import { WeatherFetchServiceService } from './weather-fetch-service.service';

describe('WeatherFetchServiceService', () => {
  let service: WeatherFetchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherFetchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
