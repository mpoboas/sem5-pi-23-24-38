import { TestBed } from '@angular/core/testing';

import { UploadBuildingService } from './upload-building.service';

describe('UploadBuildingService', () => {
  let service: UploadBuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadBuildingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
