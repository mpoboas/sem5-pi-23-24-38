import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TunnelComponent } from './tunnel.component';

describe('TunnelComponent', () => {
  let component: TunnelComponent;
  let fixture: ComponentFixture<TunnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TunnelComponent]
    });
    fixture = TestBed.createComponent(TunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
