import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberContactsComponent } from './member-contacts.component';

describe('MemberContactsComponent', () => {
  let component: MemberContactsComponent;
  let fixture: ComponentFixture<MemberContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
