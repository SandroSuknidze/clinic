import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCategoryListItemComponent } from './small-category-list-item.component';

describe('SmallCategoryListItemComponent', () => {
  let component: SmallCategoryListItemComponent;
  let fixture: ComponentFixture<SmallCategoryListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallCategoryListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallCategoryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
