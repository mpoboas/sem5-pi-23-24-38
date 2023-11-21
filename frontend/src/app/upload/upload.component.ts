import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadBuildingService } from './upload-building.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private dialog: MatDialog, private uploadBuildingService: UploadBuildingService) {}

  selectFile(): void {
    // Trigger the file input click
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.uploadBuildingService.processBuildingData(file);
  }
}
