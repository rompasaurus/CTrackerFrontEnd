import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideAddFormComponent } from './ride-add-form.component';

describe('RideAddFormComponent', () => {
  let component: RideAddFormComponent;
  let fixture: ComponentFixture<RideAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
