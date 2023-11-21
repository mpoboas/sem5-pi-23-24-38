import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFloorWithTunnelComponent } from './get-floor-with-tunnel.component';

describe('GetFloorWithTunnelComponent', () => {
  let component: GetFloorWithTunnelComponent;
  let fixture: ComponentFixture<GetFloorWithTunnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetFloorWithTunnelComponent]
    });
    fixture = TestBed.createComponent(GetFloorWithTunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
