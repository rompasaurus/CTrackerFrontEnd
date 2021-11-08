import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRideListComponent } from './my-ride-list.component';

describe('MyRideListComponent', () => {
  let component: MyRideListComponent;
  let fixture: ComponentFixture<MyRideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRideListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
