import { Injectable } from '@angular/core';
import { UserRole } from '../enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  getRoles() {
    return [
      { value: UserRole.Admin, label: 'Admin' },
      { value: UserRole.Doctor, label: 'Doctor' },
      { value: UserRole.User, label: 'User' }
    ];
  }
}
