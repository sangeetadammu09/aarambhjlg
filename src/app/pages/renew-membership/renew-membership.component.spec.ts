import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewMembershipComponent } from './renew-membership.component';

describe('RenewMembershipComponent', () => {
  let component: RenewMembershipComponent;
  let fixture: ComponentFixture<RenewMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
