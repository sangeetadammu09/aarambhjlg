import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSlotComponent } from './tax-slot.component';

describe('TaxSlotComponent', () => {
  let component: TaxSlotComponent;
  let fixture: ComponentFixture<TaxSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxSlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
