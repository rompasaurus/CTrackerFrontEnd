import { TestBed } from '@angular/core/testing';

import { RcdbScraperService } from './rcdb-scraper.service';

describe('RcdbScraperService', () => {
  let service: RcdbScraperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RcdbScraperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
