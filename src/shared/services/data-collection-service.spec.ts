import { TestBed, inject } from '@angular/core/testing';

import { DataCollectionServiceService } from './data-collection-service';

describe('DataCollectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCollectionServiceService]
    });
  });

  it('should be created', inject([DataCollectionServiceService], (service: DataCollectionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
