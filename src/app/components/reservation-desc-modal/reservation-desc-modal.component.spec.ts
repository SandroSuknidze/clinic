import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDescModalComponent } from './reservation-desc-modal.component';

describe('ReservationDescModalComponent', () => {
  let component: ReservationDescModalComponent;
  let fixture: ComponentFixture<ReservationDescModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationDescModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDescModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
