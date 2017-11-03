import { TestBed, inject } from '@angular/core/testing';

import { DataCollectionApiService } from './data-collection-api.service';

describe('DataCollectionApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCollectionApiService]
    });
  });

  it('should be created', inject([DataCollectionApiService], (service: DataCollectionApiService) => {
    expect(service).toBeTruthy();
  }));
});
