import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSubmissionsComponent } from './final-submissions.component';

describe('FinalSubmissionsComponent', () => {
  let component: FinalSubmissionsComponent;
  let fixture: ComponentFixture<FinalSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalSubmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
