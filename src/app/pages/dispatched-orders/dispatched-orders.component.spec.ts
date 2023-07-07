import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchedOrdersComponent } from './dispatched-orders.component';

describe('DispatchedOrdersComponent', () => {
  let component: DispatchedOrdersComponent;
  let fixture: ComponentFixture<DispatchedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
