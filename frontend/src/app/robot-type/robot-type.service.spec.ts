import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotTypeService } from './robot-type.service';

describe('RobotTypeService', () => {
  let service: RobotTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RobotTypeService]
    });
    service = TestBed.inject(RobotTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a robot type', () => {
    const robotTypeData = { name: 'Robot 1', type: 'Type 1' };
    service.createRobotType(robotTypeData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robot-types');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(robotTypeData);
    req.flush({});
  });

  it('should send a PUT request to update a robot type', () => {
    const robotTypeData = { id: '1', name: 'Robot 1', type: 'Type 1' };
    service.updateRobotType(robotTypeData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robot-types');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(robotTypeData);
    req.flush({});
  });

  it('should send a PATCH request to update a robot type partially', () => {
    const robotTypeData = { name: 'Robot 1' };
    const id = '1';
    service.patchRobotType(id, robotTypeData).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/robot-types/${id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(robotTypeData);
    req.flush({});
  });

  it('should send a GET request to retrieve all robot types', () => {
    service.getRobotTypes().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robot-types');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a GET request to retrieve a robot type by ID', () => {
    const id = '1';
    service.findRobotTypeById(id).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/robot-types/byId/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});