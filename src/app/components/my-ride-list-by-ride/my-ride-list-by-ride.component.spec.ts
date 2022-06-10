import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRideListByRideComponent } from './my-ride-list-by-ride.component';

describe('MyRideListByRideComponent', () => {
  let component: MyRideListByRideComponent;
  let fixture: ComponentFixture<MyRideListByRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRideListByRideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRideListByRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
