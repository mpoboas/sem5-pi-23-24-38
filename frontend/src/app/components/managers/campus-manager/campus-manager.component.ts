import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-campus-manager',
  templateUrl: './campus-manager.component.html',
  styleUrls: ['./campus-manager.component.scss']
})
export class CampusManagerComponent {
  constructor(public authService: AuthService) {}
}
