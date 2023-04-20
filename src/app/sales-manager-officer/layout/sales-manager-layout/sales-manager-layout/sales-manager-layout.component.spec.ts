import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesManagerLayoutComponent } from './sales-manager-layout.component';
describe('SalesManagerLayoutComponent', () => {
  let component: SalesManagerLayoutComponent;
  let fixture: ComponentFixture<SalesManagerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesManagerLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesManagerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
