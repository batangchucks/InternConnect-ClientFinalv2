import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedSubmissionsComponent } from './approved-submissions.component';

describe('ApprovedSubmissionsComponent', () => {
  let component: ApprovedSubmissionsComponent;
  let fixture: ComponentFixture<ApprovedSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedSubmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
