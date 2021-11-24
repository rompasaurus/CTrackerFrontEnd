import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitStepperFormComponent } from './visit-stepper-form.component';

describe('VisitStepperFormComponent', () => {
  let component: VisitStepperFormComponent;
  let fixture: ComponentFixture<VisitStepperFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitStepperFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitStepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
