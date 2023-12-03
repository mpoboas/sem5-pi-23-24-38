import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaneamentoService } from '../planeamento/planeamento.service';
import { Location } from '@angular/common';

export interface Pisos {
  piso1: string;
  piso2: string;
}

@Component({
  selector: 'app-get-trajetoria',
  templateUrl: './get-trajetoria.component.html',
  styleUrls: ['./get-trajetoria.component.scss']
})
export class GetTrajetoriaComponent {
  form: FormGroup;
  trajeto: JSON;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pisos,
    public dialogRef: MatDialogRef<GetTrajetoriaComponent>,
    private fb: FormBuilder,
    private planeamentoService: PlaneamentoService,
    private location: Location,
  ) {
    this.form = this.fb.group({
      piso1: [data.piso1, Validators.required],
      piso2: [data.piso2, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getTrajeto(): void {
    if (this.form.valid) {
      const inicio = this.form.value.piso1;
      const fim = this.form.value.piso2;
      // Call the createBuilding method from your BuildingService
      this.planeamentoService.getTrajetoria(inicio,fim).subscribe(
        (response: any) => {
          console.log('successfull', response);
          this.trajeto = response;
        },
        (error: any) => {
          console.error('Error', error);
        }
      );
    }
  }




  }


