import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkDropdownComponent } from './park-dropdown.component';

describe('ParkDropdownComponent', () => {
  let component: ParkDropdownComponent;
  let fixture: ComponentFixture<ParkDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
