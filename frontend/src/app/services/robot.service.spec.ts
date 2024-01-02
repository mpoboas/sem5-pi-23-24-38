
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotService } from './robot.service';

describe('RobotService', () => {
  let service: RobotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RobotService]
    });
    service = TestBed.inject(RobotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a robot', () => {
    const robotData = { name: 'Robot 1' };
    service.createRobot(robotData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robots');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(robotData);
    req.flush({});
  });

  it('should send a GET request to fetch robots', () => {
    service.getRobots().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robots');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a PUT request to update a robot', () => {
    const robotData = { id: 1, name: 'Updated Robot' };
    service.updateRobot(robotData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/robots');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(robotData);
    req.flush({});
  });

  it('should send a PATCH request to toggle a robot', () => {
    const robot = { id: 1, isActive: true };
    service.toggleRobot(robot).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/robots/${robot.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ isActive: !robot.isActive });
    req.flush({});
  });
});