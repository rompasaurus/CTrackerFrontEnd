import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkAddFormComponent } from './park-add-form.component';

describe('ParkAddFormComponent', () => {
  let component: ParkAddFormComponent;
  let fixture: ComponentFixture<ParkAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
