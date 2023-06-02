import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeaderComponent } from './assign-leader.component';

describe('AssignLeaderComponent', () => {
  let component: AssignLeaderComponent;
  let fixture: ComponentFixture<AssignLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
