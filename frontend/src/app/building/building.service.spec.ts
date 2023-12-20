
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BuildingService } from './building.service';

describe('BuildingService', () => {
  let service: BuildingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuildingService]
    });
    service = TestBed.inject(BuildingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a building', () => {
    const buildingData = { name: 'Building 1' };

    service.createBuilding(buildingData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/buildings');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(buildingData);
    req.flush({});
  });

  it('should send a PUT request to update a building', () => {
    const buildingData = { id: '1', name: 'Updated Building' };

    service.updateBuilding(buildingData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/buildings');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(buildingData);
    req.flush({});
  });

  it('should send a PATCH request to update a building partially', () => {
    const id = '1';
    const buildingData = { name: 'Updated Building' };

    service.patchBuilding(id, buildingData).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/buildings/${id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(buildingData);
    req.flush({});
  });

  it('should send a GET request to retrieve all buildings', () => {
    service.getBuildings().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/buildings');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a GET request to retrieve a building by ID', () => {
    const id = '1';

    service.findBuildingById(id).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/buildings/byId/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a GET request to retrieve a building by code', () => {
    const code = 'ABC123';

    service.findBuildingByCode(code).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/buildings/byCode/${code}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a GET request to retrieve buildings within a floor range', () => {
    const range = '1-5';

    service.findBuildingByMinMaxFloors(range).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/buildings/floorRange/${range}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a GET request to retrieve the code of a building', () => {
    const buildingId = '1';

    service.getBuildingCode(buildingId).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/buildings/getBuildingCode/${buildingId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});