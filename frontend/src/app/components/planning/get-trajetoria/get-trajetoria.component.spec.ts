import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTrajetoriaComponent } from './get-trajetoria.component';

describe('GetTrajetoriaComponent', () => {
  let component: GetTrajetoriaComponent;
  let fixture: ComponentFixture<GetTrajetoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetTrajetoriaComponent]
    });
    fixture = TestBed.createComponent(GetTrajetoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
