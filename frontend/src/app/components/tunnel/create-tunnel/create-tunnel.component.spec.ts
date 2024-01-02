import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTunnelComponent } from './create-tunnel.component';

describe('CreateTunnelComponent', () => {
  let component: CreateTunnelComponent;
  let fixture: ComponentFixture<CreateTunnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTunnelComponent]
    });
    fixture = TestBed.createComponent(CreateTunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
