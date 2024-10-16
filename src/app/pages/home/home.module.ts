import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { HomeComponent } from './home.component';
import { CardComponent } from '../../components/card/card.component';
import { SmallCategoryListComponent } from '../../components/small-category-list/small-category-list.component';
import { SmallCategoryListItemComponent } from '../../components/small-category-list-item/small-category-list-item.component';

@NgModule({
    declarations: [HomeComponent, CardComponent, SmallCategoryListComponent, SmallCategoryListItemComponent],
    imports: [CommonModule, HomeRoutingModule, FormsModule, RatingModule],
})
export class HomeModule {}
