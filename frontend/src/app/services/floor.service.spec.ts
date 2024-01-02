
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FloorService } from './floor.service';

describe('FloorService', () => {
  let service: FloorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FloorService]
    });
    service = TestBed.inject(FloorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a floor', () => {
    const floorData = { /* provide floor data for testing */ };
    service.createFloor(floorData).subscribe(() => {
      // perform assertions on the response if needed
    });

    const req = httpMock.expectOne('http://localhost:3000/api/floors');
    expect(req.request.method).toBe('POST');
    req.flush({ /* provide mock response if needed */ });
  });

  it('should send a GET request to retrieve floors', () => {
    service.getFloors().subscribe(() => {
      // perform assertions on the response if needed
    });

    const req = httpMock.expectOne('http://localhost:3000/api/floors');
    expect(req.request.method).toBe('GET');
    req.flush({ /* provide mock response if needed */ });
  });

  it('should send a GET request to retrieve building floors', () => {
    const buildingId = '123';
    service.getBuildingFloors(buildingId).subscribe(() => {
      // perform assertions on the response if needed
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/floors/${buildingId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* provide mock response if needed */ });
  });

  it('should send a GET request to find a floor by number', () => {
    const floorNumber = '1';
    service.findFloorByNumber(floorNumber).subscribe(() => {
      // perform assertions on the response if needed
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/floors/byNumber/${floorNumber}`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* provide mock response if needed */ });
  });

  it('should send a GET request to retrieve floor number', () => {
    const floorId = '123';
    service.getFloorNum(floorId).subscribe(() => {
      // perform assertions on the response if needed
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/floors/getFloorNum/${floorId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* provide mock response if needed */ });
  });

  it('should send a PUT request to update a floor', () => {
    const floorData = { /* provide floor data for testing */ };
    service.updateFloor(floorData).subscribe(() => {
      // perform assertions on the response if needed
    });

    const req = httpMock.expectOne('http://localhost:3000/api/floors');
    expect(req.request.method).toBe('PUT');
    req.flush({ /* provide mock response if needed */ });
  });

  it('should send a PATCH request to update a floor partially', () => {
    const floorId = '123';
    const floorData = { /* provide floor data for testing */ };
    service.patchFloor(floorId, floorData).subscribe(() => {
      // perform assertions on the response if needed
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/floors/${floorId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush({ /* provide mock response if needed */ });
  });
});