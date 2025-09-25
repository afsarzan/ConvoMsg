import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBox } from './landing-box';

describe('LandingBox', () => {
  let component: LandingBox;
  let fixture: ComponentFixture<LandingBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
