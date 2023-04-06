import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRelationLayoutComponent } from './sales-relation-layout.component';

describe('SalesRelationLayoutComponent', () => {
  let component: SalesRelationLayoutComponent;
  let fixture: ComponentFixture<SalesRelationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesRelationLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesRelationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
