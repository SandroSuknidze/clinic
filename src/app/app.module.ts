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
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ErrorComponent,
    ModalComponent,
    CategoriesComponent,
    CategoryListItemComponent,
    CalendarComponent,
    ReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideToastr({
      // positionClass: 'toast-top-center'
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
