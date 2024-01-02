
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClassroomService } from './classroom.service';

describe('ClassroomService', () => {
  let service: ClassroomService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClassroomService]
    });
    service = TestBed.inject(ClassroomService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a classroom', () => {
    const classroomData = { name: 'Math', capacity: 30 };
    service.createClassroom(classroomData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/classrooms');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(classroomData);
    req.flush({});
  });

  it('should send a PUT request to update a classroom', () => {
    const classroomData = { id: '1', name: 'Math', capacity: 30 };
    service.updateClassroom(classroomData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/classrooms');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(classroomData);
    req.flush({});
  });

  it('should send a PATCH request to update a classroom partially', () => {
    const classroomData = { name: 'Math' };
    const id = '1';
    service.patchClassroom(id, classroomData).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/classrooms/${id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(classroomData);
    req.flush({});
  });

  it('should send a GET request to fetch classrooms', () => {
    service.getClassrooms().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/classrooms');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});