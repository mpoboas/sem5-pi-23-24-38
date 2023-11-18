import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTunnelDialogComponent } from './create-tunnel-dialog.component';

describe('CreateTunnelDialogComponent', () => {
  let component: CreateTunnelDialogComponent;
  let fixture: ComponentFixture<CreateTunnelDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTunnelDialogComponent]
    });
    fixture = TestBed.createComponent(CreateTunnelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
