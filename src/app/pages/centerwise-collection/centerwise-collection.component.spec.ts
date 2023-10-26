import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterwiseCollectionComponent } from './centerwise-collection.component';

describe('CenterwiseCollectionComponent', () => {
  let component: CenterwiseCollectionComponent;
  let fixture: ComponentFixture<CenterwiseCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterwiseCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterwiseCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
