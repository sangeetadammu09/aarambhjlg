import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalpendingOrdersComponent } from './approvalpending-orders.component';

describe('ApprovalpendingOrdersComponent', () => {
  let component: ApprovalpendingOrdersComponent;
  let fixture: ComponentFixture<ApprovalpendingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalpendingOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalpendingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
