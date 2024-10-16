import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCategoryListComponent } from './small-category-list.component';

describe('SmallCategoryListComponent', () => {
  let component: SmallCategoryListComponent;
  let fixture: ComponentFixture<SmallCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallCategoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
