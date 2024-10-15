import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { HomeComponent } from './home.component';
import { CardComponent } from '../../components/card/card.component';

@NgModule({
    declarations: [HomeComponent, CardComponent],
    imports: [CommonModule, HomeRoutingModule, FormsModule, RatingModule],
})
export class HomeModule {}
