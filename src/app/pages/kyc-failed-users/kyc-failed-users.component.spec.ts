import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycFailedUsersComponent } from './kyc-failed-users.component';

describe('KycFailedUsersComponent', () => {
  let component: KycFailedUsersComponent;
  let fixture: ComponentFixture<KycFailedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycFailedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycFailedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
