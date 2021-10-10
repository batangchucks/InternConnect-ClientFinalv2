import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingUpdateComponent } from './landing-update.component';

describe('LandingUpdateComponent', () => {
  let component: LandingUpdateComponent;
  let fixture: ComponentFixture<LandingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
