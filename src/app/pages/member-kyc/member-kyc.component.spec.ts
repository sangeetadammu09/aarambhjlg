import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberKycComponent } from './member-kyc.component';

describe('MemberKycComponent', () => {
  let component: MemberKycComponent;
  let fixture: ComponentFixture<MemberKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberKycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
