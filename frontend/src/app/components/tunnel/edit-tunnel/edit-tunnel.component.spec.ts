import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTunnelComponent } from './edit-tunnel.component';

describe('EditTunnelComponent', () => {
  let component: EditTunnelComponent;
  let fixture: ComponentFixture<EditTunnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTunnelComponent]
    });
    fixture = TestBed.createComponent(EditTunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
