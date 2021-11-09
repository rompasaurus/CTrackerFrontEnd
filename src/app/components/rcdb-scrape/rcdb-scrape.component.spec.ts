import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcdbScrapeComponent } from './rcdb-scrape.component';

describe('RcdbScrapeComponent', () => {
  let component: RcdbScrapeComponent;
  let fixture: ComponentFixture<RcdbScrapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcdbScrapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RcdbScrapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
