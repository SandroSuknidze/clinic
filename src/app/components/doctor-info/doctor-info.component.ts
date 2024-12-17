import { Component, OnInit } from '@angular/core';
import {PermissionService} from "../../services/permission.service";

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.css'
})
export class DoctorInfoComponent {
    value: number = 5;
    role: string;

    constructor(public permissionService: PermissionService) {
        this.role = this.permissionService.getRole();

    }

    changeRole(role: string): void {
        this.permissionService.setRole(role);
        this.role = this.permissionService.getRole();
    }


}
