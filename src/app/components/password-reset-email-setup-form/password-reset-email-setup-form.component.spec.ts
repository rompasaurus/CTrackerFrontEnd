import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetEmailSetupFormComponent } from './password-reset-email-setup-form.component';

describe('PasswordResetEmailSetupFormComponent', () => {
  let component: PasswordResetEmailSetupFormComponent;
  let fixture: ComponentFixture<PasswordResetEmailSetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetEmailSetupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetEmailSetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
