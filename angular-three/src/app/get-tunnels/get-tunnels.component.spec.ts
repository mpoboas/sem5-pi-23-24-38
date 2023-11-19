import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTunnelsComponent } from './get-tunnels.component';

describe('GetTunnelsComponent', () => {
  let component: GetTunnelsComponent;
  let fixture: ComponentFixture<GetTunnelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetTunnelsComponent]
    });
    fixture = TestBed.createComponent(GetTunnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
