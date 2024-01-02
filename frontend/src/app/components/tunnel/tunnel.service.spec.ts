import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TunnelService } from './tunnel.service';

describe('TunnelService', () => {
  let service: TunnelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TunnelService]
    });
    service = TestBed.inject(TunnelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a tunnel', () => {
    const tunnelData = { name: 'Tunnel 1' };
    service.createTunnel(tunnelData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/tunnels');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(tunnelData);
    req.flush({});
  });

  it('should send a GET request to retrieve tunnels', () => {
    service.getTunnels().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/tunnels');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a GET request to retrieve a floor number', () => {
    const floorId = '123';
    service.getFloorNumber(floorId).subscribe();

    const req = httpMock.expectOne(`http://localhost:3000/api/tunnels/byId/${floorId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a PUT request to update a tunnel', () => {
    const tunnelData = { id: '123', name: 'Updated Tunnel' };
    service.updateTunnel(tunnelData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/tunnels');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(tunnelData);
    req.flush({});
  });

  it('should send a PATCH request to update a tunnel', () => {
    const tunnelData = { id: '123', name: 'Updated Tunnel' };
    service.patchTunnel('123', tunnelData).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/tunnels/123');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(tunnelData);
    req.flush({});
  });

  it('should send a GET request to retrieve floors tunnel', () => {
    service.getFloorsTunnel().subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/tunnels/getFloorsTunnel');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});