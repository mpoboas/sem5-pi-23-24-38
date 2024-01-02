
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElevatorService } from './elevator.service';

describe('ElevatorService', () => {
  let service: ElevatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElevatorService]
    });
    service = TestBed.inject(ElevatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create an elevator', () => {
    const elevatorData = { /* provide test data here */ };
    service.createElevator(elevatorData).subscribe(() => {
      // Add your expectations here
    });

    const req = httpMock.expectOne('http://localhost:3000/api/elevators');
    expect(req.request.method).toBe('POST');
    req.flush({ /* provide mock response here */ });
  });

  it('should send a GET request to retrieve elevators', () => {
    service.getElevators().subscribe(() => {
      // Add your expectations here
    });

    const req = httpMock.expectOne('http://localhost:3000/api/elevators');
    expect(req.request.method).toBe('GET');
    req.flush({ /* provide mock response here */ });
  });

  it('should send a GET request to retrieve elevator floors', () => {
    const elevatorId = '123';
    service.getElevatorFloors(elevatorId).subscribe(() => {
      // Add your expectations here
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/elevators/getElevatorFloors/${elevatorId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* provide mock response here */ });
  });

  it('should send a PUT request to update an elevator', () => {
    const elevatorData = { /* provide test data here */ };
    service.updateElevator(elevatorData).subscribe(() => {
      // Add your expectations here
    });

    const req = httpMock.expectOne('http://localhost:3000/api/elevators');
    expect(req.request.method).toBe('PUT');
    req.flush({ /* provide mock response here */ });
  });

  it('should send a PATCH request to update specific elevator', () => {
    const elevatorId = '123';
    const elevatorData = { /* provide test data here */ };
    service.patchElevator(elevatorId, elevatorData).subscribe(() => {
      // Add your expectations here
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/elevators/${elevatorId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush({ /* provide mock response here */ });
  });
});