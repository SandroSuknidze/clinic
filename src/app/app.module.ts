import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/interceptor';
import { DoctorManagementComponent } from './pages/admin/doctor-management/doctor-management.component';
import { DoctorRegisterComponent } from './pages/admin/doctor-register/doctor-register.component';
import {NgOptimizedImage} from "@angular/common";
import {ReservationDescModalComponent} from "./components/reservation-desc-modal/reservation-desc-modal.component";
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        RegisterComponent,
        ErrorComponent,
        ModalComponent,
        CategoryListItemComponent,
        CalendarComponent,
        ReservationComponent,
        DoctorManagementComponent,
        DoctorRegisterComponent,
        ReservationDescModalComponent,
        DoctorInfoComponent,
        ResetPasswordComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RatingModule,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage,
    ],
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideToastr({
      // positionClass: 'toast-top-center'
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
