import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipHistoryComponent } from './membership-history.component';

describe('MembershipHistoryComponent', () => {
  let component: MembershipHistoryComponent;
  let fixture: ComponentFixture<MembershipHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
