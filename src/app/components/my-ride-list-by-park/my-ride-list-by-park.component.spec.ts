import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRideListByParkComponent } from './my-ride-list-by-park.component';

describe('MyRideListByParkComponent', () => {
  let component: MyRideListByParkComponent;
  let fixture: ComponentFixture<MyRideListByParkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRideListByParkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRideListByParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
