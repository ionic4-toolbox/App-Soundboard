import { TestBed } from '@angular/core/testing';

import { SoundsDataService } from './sounds-data.service';

describe('SoundsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundsDataService = TestBed.get(SoundsDataService);
    expect(service).toBeTruthy();
  });
});
