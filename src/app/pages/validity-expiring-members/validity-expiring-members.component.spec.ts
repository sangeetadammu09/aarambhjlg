import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidityExpiringMembersComponent } from './validity-expiring-members.component';

describe('ValidityExpiringMembersComponent', () => {
  let component: ValidityExpiringMembersComponent;
  let fixture: ComponentFixture<ValidityExpiringMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidityExpiringMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidityExpiringMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
