import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {ErrorComponent} from './components/error/error.component';
import {ReservationComponent} from './pages/reservation/reservation.component';
import {DoctorManagementComponent} from "./pages/admin/doctor-management/doctor-management.component";
import {DoctorRegisterComponent} from "./pages/admin/doctor-register/doctor-register.component";

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
    },
    {
        path: 'reservation',
        component: ReservationComponent,
    },
    {
        path: 'admin/doctor-management',
        component: DoctorManagementComponent,
    },
    {
        path: 'admin/doctor-register',
        component: DoctorRegisterComponent,
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
