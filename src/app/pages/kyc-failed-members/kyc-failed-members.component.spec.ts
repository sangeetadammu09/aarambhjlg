import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycFailedMembersComponent } from './kyc-failed-members.component';

describe('KycFailedMembersComponent', () => {
  let component: KycFailedMembersComponent;
  let fixture: ComponentFixture<KycFailedMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycFailedMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycFailedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
