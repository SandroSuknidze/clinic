import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {ErrorComponent} from './components/error/error.component';
import {ReservationComponent} from './pages/reservation/reservation.component';
import {DoctorManagementComponent} from "./pages/admin/doctor-management/doctor-management.component";
import {DoctorRegisterComponent} from "./pages/admin/doctor-register/doctor-register.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomeModule),
        pathMatch: 'full',
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [authGuard]
    },
    {
        path: 'reservation',
        component: ReservationComponent,
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [authGuard]
    },
    {
        path: 'admin/doctor-management',
        component: DoctorManagementComponent,
        canActivate: [roleGuard],
        data: { role: 'Admin' }
    },
    {
        path: 'admin/doctor-register',
        component: DoctorRegisterComponent,
        canActivate: [roleGuard],
        data: { role: 'Admin' }
    },
    {
        path: '**',
        component: ErrorComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
