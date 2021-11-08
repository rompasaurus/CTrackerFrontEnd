import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRideAddFormComponent } from './my-ride-add-form.component';

describe('MyRideAddFormComponent', () => {
  let component: MyRideAddFormComponent;
  let fixture: ComponentFixture<MyRideAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRideAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRideAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
