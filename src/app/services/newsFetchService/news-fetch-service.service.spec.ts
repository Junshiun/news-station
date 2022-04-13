import { TestBed } from '@angular/core/testing';

import { NewsFetchServiceService } from './news-fetch-service.service';

describe('NewsFetchServiceService', () => {
  let service: NewsFetchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsFetchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
